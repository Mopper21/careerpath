//JobPostingForm.jsx
import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase-config';

const JobPostingForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [companyName, setCompanyName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'Job Opening'), {
        title,
        description,
        companyName, // Include the company name in the data submitted to the database
      });
      alert('Job posting submitted successfully!');
      setTitle('');
      setDescription('');
      setCompanyName(''); // Clear the company name field after submission
    } catch (error) {
      console.error('Error submitting job posting:', error);
      alert('Failed to submit job posting. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input type="text" id="title" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea id="description" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div className="mb-3">
        <label htmlFor="companyName" className="form-label">Company Name</label>
        <input type="text" id="companyName" className="form-control" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
};

export default JobPostingForm;