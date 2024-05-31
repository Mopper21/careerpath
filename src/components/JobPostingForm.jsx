import React, { useState, useEffect } from 'react';
import { addDoc, collection, doc, updateDoc, deleteDoc, getDocs, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase-config';

const JobPostingForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobPostings, setJobPostings] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserRole(userData.role);
          setUserId(user.uid);
        }
      }
    };

    fetchUserRole();
  }, []);

  useEffect(() => {
    const fetchJobPostings = async () => {
      try {
        const jobCollection = collection(db, 'Job Opening');
        const jobSnapshot = await getDocs(jobCollection);
        const jobList = jobSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setJobPostings(jobList);
      } catch (error) {
        console.error('Error fetching job postings:', error);
      }
    };

    fetchJobPostings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      await addDoc(collection(db, 'Job Opening'), {
        title,
        description,
        companyName,
        userId: user.uid
      });
      alert('Job posting added successfully!');
      setTitle('');
      setDescription('');
      setCompanyName('');
    } catch (error) {
      console.error('Error adding job posting:', error);
      alert('Failed to add job posting. Please try again.');
    }
  };

  const handleDeleteJobPosting = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      try {
        await deleteDoc(doc(db, 'Job Opening', jobId));
        alert('Job posting deleted successfully!');
      } catch (error) {
        console.error('Error deleting job posting:', error);
        alert('Failed to delete job posting. Please try again.');
      }
    }
  };

  const handleEditJobPosting = async (jobId, updatedJob) => {
    try {
      await updateDoc(doc(db, 'Job Opening', jobId), updatedJob);
      alert('Job posting updated successfully!');
    } catch (error) {
      console.error('Error updating job posting:', error);
      alert('Failed to update job posting. Please try again.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Job Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
        </div>
        <div>
          <label>Company Name:</label>
          <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
        </div>
        <button type="submit">Add Job Posting</button>
      </form>
      <div>
        <h3>Your Job Postings</h3>
        {jobPostings.filter(job => job.userId === userId).map(job => (
          <div key={job.id}>
            <h4>{job.title}</h4>
            <p>{job.description}</p>
            <button onClick={() => handleEditJobPosting(job.id, { ...job, title: 'Updated Job Title' })}>Edit</button>
            <button onClick={() => handleDeleteJobPosting(job.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobPostingForm;
