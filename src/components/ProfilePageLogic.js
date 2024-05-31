//ProfilePageLogic.js
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
  const [loading, setLoading] = useState(true);
  const [selectedFileName, setSelectedFileName] = useState('');
  const navigate = useNavigate();
  const storage = getStorage(); 
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
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
        }
      } else {
        navigate('/auth');
      }
      setLoading(false);
    };

    fetchUserData();
  }, [user, navigate]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file && user) {
      try {
        const storageRef = ref(storage, `profilePictures/${user.uid}`);
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

  const handleInputChange = (field, value) => {
    if (field === 'name') {
      setName(value);
    } else if (field === 'dateOfBirth') {
      setDateOfBirth(value);
    }
  };

  const handleSave = async () => {
    if (user) {
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

  return { name, dateOfBirth, userRole, profilePicture, loading, selectedFileName, handleFileChange, handleInputChange, handleSave, fileInputRef };
}

export default ProfilePageLogic;
