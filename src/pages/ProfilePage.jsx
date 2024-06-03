import React, { useState, useEffect } from 'react';
import ProfilePageLogic from '../components/ProfilePageLogic';
import ProgramPromotionForm from '../components/ProgramPromotionForm';
import JobPostingForm from '../components/JobPostingForm';
import JobEditForm from '../components/JobEditForm';
import { collection, deleteDoc, doc, getDocs, query, updateDoc, where, addDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase-config';

function ProfilePage({ user, handleSignOut }) {
  const {
    name,
    dateOfBirth,
    userRole,
    profilePicture,
    loading,
    selectedFileName,
    handleFileChange,
    handleSave,
    handleInputChange,
    fileInputRef,
    
  } = ProfilePageLogic({ user, handleSignOut });

  

  const [jobs, setJobs] = useState([]);
  const [currentJob, setCurrentJob] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user && user.uid) { // Add a null check for user and user.uid
      fetchUserJobs();
    }
  }, [user]);
  

  useEffect(() => { // Add useEffect for real-time updates
    const unsubscribe = onSnapshot(query(collection(db, 'jobPostings'), where('userId', '==', user.uid)), (snapshot) => {
      const userJobs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setJobs(userJobs);
    });

    return () => unsubscribe();
  }, [user]);
  

  const fetchUserJobs = async () => {
    const jobsCollection = collection(db, 'jobPostings');
    const q = query(jobsCollection, where('userId', '==', user.uid));
    const querySnapshot = await getDocs(q);
    const userJobs = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setJobs(userJobs);
  };

  const handleEdit = (job) => {
    setCurrentJob(job);
    setIsEditing(true);
  };

  const handleJobSave = async (updatedJob) => {
    const jobDoc = doc(db, 'jobPostings', updatedJob.id);
    await updateDoc(jobDoc, updatedJob);
    fetchUserJobs();
    setIsEditing(false);
    setCurrentJob(null);
  };

  const handleDelete = async (jobId) => {
    await deleteDoc(doc(db, 'jobPostings', jobId));
    fetchUserJobs();
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentJob(null);
  };

  const handleJobAdded = async () => {
    try {
      // Add the new job directly to the list
      const newJobRef = await addDoc(collection(db, 'jobPostings'), {
        userId: user.uid,
        jobName: '',
        description: '',
        companyName: '',
      });
      const newJobData = {
        id: newJobRef.id,
        userId: user.uid,
        jobName: '',
        description: '',
        companyName: '',
      };
      setJobs(prevJobs => [newJobData, ...prevJobs]); // Update state with new job
    } catch (error) {
      console.error('Error adding job:', error);
    }
  };
  

  return (
    <main>
      <section className="profile-section">
        <div className="container">
          <ProfileContent
            user={user}
            name={name}
            dateOfBirth={dateOfBirth}
            userRole={userRole}
            profilePicture={profilePicture}
            selectedFileName={selectedFileName}
            handleFileChange={handleFileChange}
            handleSave={handleSave}
            handleInputChange={handleInputChange}
            fileInputRef={fileInputRef}
            handleSignOut={handleSignOut}
          />

          {userRole === 'educational-institution' && <ProgramPromotionForm />}
       
          {userRole === 'company' && (
            <div className="mb-3">
              <h3>Post Job Opportunity</h3>
              <JobPostingForm user={user} onJobAdded={handleJobAdded} />
            </div>
          )}

          {userRole === 'company' && (
            <div>
              <h3 style={{ marginBottom: '20px' }}>Your Job Postings</h3>
              <div className="job-postings">
              {isEditing ? (
                <JobEditForm
                  job={currentJob}
                  currentUserId={user.uid}
                  onSave={handleJobSave}
                  onCancel={handleCancel}
                />
              ) : (
                <div className="job-list">
                  {jobs.map((job) => (
                    <div key={job.id} className="job-item">
                      <h4>{job.jobName}</h4>
                      <p>{job.description}</p>
                      <p><strong>Company:</strong> {job.companyName}</p>
                      {job.userId === user.uid && (
                <div className="job-buttons">
                  <button className="btn btn-primary" onClick={() => handleEdit(job)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(job.id)}>Delete</button>
                  </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

const ProfileContent = ({
  user,
  name,
  dateOfBirth,
  userRole,
  profilePicture,
  selectedFileName,
  handleFileChange,
  handleSave,
  handleInputChange,
  fileInputRef,
  handleSignOut,
}) => {
  if (!user) {
    return null; // Or render a loading indicator or default content
  }

  return (
    <div className="profile-content">
      <div className="card">
        <div className="card-body">
          <ProfilePicture
            profilePicture={profilePicture}
            selectedFileName={selectedFileName}
            handleFileChange={handleFileChange}
            fileInputRef={fileInputRef}
          />
          <ProfileDetails
            user={user}
            name={name}
            dateOfBirth={dateOfBirth}
            userRole={userRole}
            handleInputChange={handleInputChange}
          />
          <div className="d-flex justify-content-between">
            <button className="btn btn-primary" onClick={handleSave}>
              Save
            </button>
            <button className="btn btn-warning" onClick={handleSignOut}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfilePicture = ({ profilePicture, selectedFileName, handleFileChange, fileInputRef }) => (
  <div className="profile-picture">
    <img src={profilePicture} alt="Profile" />
    <div className="custom-file-upload">
      <button className="btn btn-secondary" onClick={() => fileInputRef.current.click()}>
        {profilePicture ? 'Change Profile Picture' : 'Upload New Profile Picture'}
      </button>
      <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
      {selectedFileName && <p>{selectedFileName}</p>}
    </div>
  </div>
);

const ProfileDetails = ({ user, name, dateOfBirth, userRole, handleInputChange }) => {
  if (!user) {
    return null; // Or render a loading indicator or default content
  }

  return (
    <>
      <div className="mb-3 row">
        <label htmlFor="email" className="form-label">Email</label>
        <input type="email" id="email" className="form-control" value={user.email} readOnly />
      </div>
      <div className="mb-3 row">
        <label htmlFor="name" className="form-label">Name</label>
        <input
          type="text"
          id="name"
          className="form-control"
          value={name}
          onChange={(e) => handleInputChange('name', e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
        <input
          type="date"
          id="dateOfBirth"
          className="form-control"
          value={dateOfBirth}
          onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="userRole" className="form-label">User Type</label>
        <input type="text" id="userRole" className="form-control" value={userRole} readOnly />
      </div>
    </>
  );
};

export default ProfilePage;