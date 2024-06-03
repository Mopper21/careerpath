import React, { useState, useEffect } from 'react';
import JobEditForm from './JobEditForm';
import JobPostingForm from './JobPostingForm';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase-config';

const JobManagement = ({ currentUserId }) => {
  const [jobs, setJobs] = useState([]);
  const [currentJob, setCurrentJob] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      const jobCollection = collection(db, 'jobPostings');
      const jobSnapshot = await getDocs(jobCollection);
      const jobList = jobSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setJobs(jobList);
    };

    fetchJobs();
  }, []);

  const handleEdit = (job) => {
    if (job.userId === currentUserId) {
      setCurrentJob(job);
      setIsEditing(true);
    } else {
      alert('You are not authorized to edit this job.');
    }
  };

  const handleSave = (updatedJob) => {
    setJobs(jobs.map(job => (job.id === updatedJob.id ? updatedJob : job)));
    setIsEditing(false);
    setCurrentJob(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentJob(null);
  };

  const handleJobAdded = async () => {
    const jobCollection = collection(db, 'jobPostings');
    const jobSnapshot = await getDocs(jobCollection);
    const jobList = jobSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setJobs(jobList);
  };

  return (
    <div>
      <h2>Job Postings</h2>
      <JobPostingForm userId={currentUserId} onJobAdded={handleJobAdded} />
      {isEditing ? (
        <JobEditForm job={currentJob} currentUserId={currentUserId} onSave={handleSave} onCancel={handleCancel} />
      ) : (
        <div>
          {jobs.map(job => (
            <div key={job.id}>
              <h3>{job.jobName}</h3>
              <p>{job.description}</p>
              <p><strong>Company:</strong> {job.companyName}</p>
              {job.userId === currentUserId && (
                <button onClick={() => handleEdit(job)}>Edit</button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobManagement;
