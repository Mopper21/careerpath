import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase-config';

const JobPostingForm = ({ user, updateSubmittedCompany }) => {
  const [description, setDescription] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const docRef = await addDoc(collection(db, 'jobPostings'), {
        description,
        companyName,
        userId: user.uid,
        createdAt: new Date()
      });
      alert('Job posting submitted successfully!');
      updateSubmittedCompany({
        id: docRef.id,
        description,
        companyName
      });
    } catch (error) {
      console.error('Error submitting job posting:', error);
    }
    
    // Clear the form fields regardless of whether there was an error or not
    setIsLoading(false);
    setDescription('');
    setCompanyName('');
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            id="description"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="companyName" className="form-label">Company Name</label>
          <input
            type="text"
            id="companyName"
            className="form-control"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default JobPostingForm;
