import React, { useState, useEffect } from 'react';
import ProfilePageLogic from '../components/ProfilePageLogic';
import ProgramPromotionForm from '../components/ProgramPromotionForm';
import JobPostingForm from '../components/JobPostingForm';
import JobEditForm from '../components/JobEditForm';
import ApplicationsSection from '../components/ApplicationsSection';
import StudentApplicationsSection from '../components/StudentApplicationsSection'; // Import the new component
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
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    if (user && user.uid) {
      fetchUserJobs();
    }
  }, [user]);

  useEffect(() => {
    if (user && user.uid) {
      const unsubscribe = onSnapshot(
        query(collection(db, 'jobPostings'), where('userId', '==', user.uid)),
        (snapshot) => {
          const userJobs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setJobs(userJobs);
        }
      );
      return () => unsubscribe();
    }
  }, [user]);

  const fetchUserJobs = async () => {
    if (user && user.uid) {
      const jobsCollection = collection(db, 'jobPostings');
      const q = query(jobsCollection, where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      const userJobs = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setJobs(userJobs);
    }
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
      setJobs((prevJobs) => [newJobData, ...prevJobs]);
    } catch (error) {
      console.error('Error adding job:', error);
    }
  };
  

  if (!user) {
    return null; // Render nothing if user is not available
  }

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
          
          {userRole === 'educational-institution' && (
            <ApplicationsSection user={user} />
          )}

          {userRole === 'student' && (
            <StudentApplicationsSection user={user} />
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
    return null;
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
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfilePicture = ({ profilePicture, selectedFileName, handleFileChange, fileInputRef }) => (
  <div className="profile-picture">
    <img src={profilePicture} alt="Profile" className="rounded-circle img-thumbnail" />
    <input
      type="file"
      onChange={handleFileChange}
      ref={fileInputRef}
      style={{ display: 'none' }}
    />
    <button className="btn btn-secondary" onClick={() => fileInputRef.current.click()}>
      {selectedFileName ? 'Change Picture' : 'Upload Picture'}
    </button>
  </div>
);

const ProfileDetails = ({ user, name, dateOfBirth, userRole, handleInputChange }) => (
  <div className="profile-details">
    <p><strong>Email:</strong> {user.email}</p>
    <div className="form-group">
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={name}
        onChange={handleInputChange}
        className="form-control"
      />
    </div>
    <div className="form-group">
      <label htmlFor="dateOfBirth">Date of Birth:</label>
      <input
        type="date"
        id="dateOfBirth"
        name="dateOfBirth"
        value={dateOfBirth}
        onChange={handleInputChange}
        className="form-control"
      />
    </div>
    <div className="form-group">
      <label htmlFor="userRole">User Role:</label>
      <input
        type="text"
        id="userRole"
        name="userRole"
        value={userRole}
        readOnly
        className="form-control"
      />
    </div>
  </div>
);

export default ProfilePage;
