import React, { useState } from 'react';
import JobEditForm from './JobEditForm';

const JobManagement = () => {
  const [jobs, setJobs] = useState([
    // Example job data
    { id: 1, title: 'Software Engineer', description: 'Develop software solutions.', companyName: 'Tech Corp' },
    { id: 2, title: 'Product Manager', description: 'Manage product lifecycle.', companyName: 'Innovate Ltd' }
  ]);
  const [currentJob, setCurrentJob] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Handle edit button click
  const handleEdit = (job) => {
    setCurrentJob(job);
    setIsEditing(true);
  };

  // Handle save button click
  const handleSave = (updatedJob) => {
    setJobs(jobs.map(job => (job.id === updatedJob.id ? updatedJob : job)));
    setIsEditing(false);
    setCurrentJob(null);
  };

  // Handle cancel button click
  const handleCancel = () => {
    setIsEditing(false);
    setCurrentJob(null);
  };

  return (
    <div>
      <h2>Job Postings</h2>
      {isEditing ? (
        <JobEditForm job={currentJob} onSave={handleSave} onCancel={handleCancel} />
      ) : (
        <div>
          {jobs.map(job => (
            <div key={job.id}>
              <h3>{job.title}</h3>
              <p>{job.description}</p>
              <p><strong>Company:</strong> {job.companyName}</p>
              <button onClick={() => handleEdit(job)}>Edit</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobManagement;
