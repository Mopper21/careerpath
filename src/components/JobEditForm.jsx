import React, { useState, useEffect } from 'react';

const JobEditForm = ({ job, currentUserId, onSave, onCancel }) => {
  const [updatedJob, setUpdatedJob] = useState({});
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (job) {
      setUpdatedJob(job);
      setIsAuthorized(job.userId === currentUserId);
    }
  }, [job, currentUserId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedJob({ ...updatedJob, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(updatedJob);
  };

  if (!isAuthorized) {
    return <p>You are not authorized to edit this job.</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="jobName" className="form-label">Job Name</label>
        <input
          type="text"
          id="jobName"
          name="jobName"
          className="form-control"
          value={updatedJob.jobName || ''}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea
          id="description"
          name="description"
          className="form-control"
          value={updatedJob.description || ''}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="companyName" className="form-label">Company Name</label>
        <input
          type="text"
          id="companyName"
          name="companyName"
          className="form-control"
          value={updatedJob.companyName || ''}
          onChange={handleChange}
        />
      </div>
      
      <div className="d-flex justify-content-between">
        <button type="submit" className="btn btn-primary">Save</button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default JobEditForm;
