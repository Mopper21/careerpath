import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';

const JobPostingForm = ({ initialUserName }) => {
  const [jobName, setJobName] = useState('');
  const [description, setDescription] = useState('');
  const [submissionDate, setSubmissionDate] = useState('');
  const [jobId, setJobId] = useState(null);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setSubmissionDate(today);
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add the new job to Firestore
      const docRef = await addDoc(collection(db, 'jobPostings'), {
        jobName,
        description,
        submissionDate,
      });

      // Get the document ID and update the document with the jobId
      const id = docRef.id;
      await updateDoc(doc(db, 'jobPostings', id), { jobId: id });

      alert('New job added successfully!');
      // Clear form fields after submission
      setJobName('');
      setDescription('');
      setJobId(id);
    } catch (error) {
      console.error('Error adding new job:', error);
      alert('Failed to add new job. Please try again.');
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="mb-3">
        <label htmlFor="jobName" className="form-label">Job Name</label>
        <input
          type="text"
          id="jobName"
          className="form-control"
          value={jobName}
          onChange={(e) => setJobName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea
          id="description"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="submissionDate" className="form-label">Submission Date</label>
        <input
          type="date"
          id="submissionDate"
          className="form-control"
          value={submissionDate}
          readOnly
        />
      </div>
      
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
};

export default JobPostingForm;
