// ProfilePageLogic.js

import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase-config';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

function ProfilePageLogic({ user, handleSignOut }) {
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [userRole, setUserRole] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('');
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();
  const storage = getStorage(); 
  const fileInputRef = useRef(null);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      console.log("User:", user); // Add this line to check the value of user
      if (user && user.uid) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setName(userData.name || '');
            setDateOfBirth(userData.dateOfBirth || '');
            setUserRole(userData.role || '');
            setProfilePicture(userData.profilePicture || '');
            setSelectedFileName(userData.profilePicture ? 'Profile Picture' : '');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false);
        }
      } else {
        navigate('/auth');
      }
    };
  
    fetchUserData();
  }, [user, navigate]);
  

  // Handle file change for profile picture
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file && user && user.uid) {
      try {
        const storageRef = ref(storage, `profilePictures/${user.uid}/${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        await updateDoc(doc(db, 'users', user.uid), { profilePicture: downloadURL });
        setProfilePicture(downloadURL);
        setSelectedFileName(file.name);
      } catch (error) {
        console.error('Error uploading profile picture:', error);
      }
    }
  };
  

  // Handle input changes for name and date of birth
  const handleInputChange = (field, value) => {
    if (field === 'name') {
      setName(value);
    } else if (field === 'dateOfBirth') {
      setDateOfBirth(value);
    }
  };

  // Handle save profile changes
  const handleSave = async () => {
    if (user && user.uid) {
      try {
        await updateDoc(doc(db, 'users', user.uid), {
          name,
          dateOfBirth
        });
        alert('Profile updated successfully!');
      } catch (error) {
        console.error('Error updating profile:', error);
        alert('Failed to update profile. Please try again.');
      }
    }
  };

  return { 
    name, 
    dateOfBirth, 
    userRole, 
    profilePicture, 
    loading, 
    selectedFileName, 
    handleFileChange, 
    handleInputChange, 
    handleSave, 
    fileInputRef,
    handleSignOut
  };
}

export default ProfilePageLogic;