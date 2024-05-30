import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { addDoc, collection } from 'firebase/firestore';


const ProgramPromotionForm = ({ initialUserName }) => {
  const [programName, setProgramName] = useState('');
  const [description, setDescription] = useState('');
  const [userName, setUserName] = useState(initialUserName);
  const [submissionDate, setSubmissionDate] = useState('');
  const [deadline, setDeadline] = useState('');

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setSubmissionDate(today);
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Submit program promotion details to Firestore
      await addDoc(collection(db, 'program'), { // Save to 'program' collection
        programName,
        description,
        submissionDate,
        deadline // Include deadline in the document
      });
      alert('New program added successfully!');
      // Clear form fields after submission
      setProgramName('');
      setDescription('');
      setUserName('');
      setDeadline('');
    } catch (error) {
      console.error('Error adding new program:', error);
      alert('Failed to add new program. Please try again.');
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="mb-3">
        <label htmlFor="programName" className="form-label">Program Name</label>
        <input
          type="text"
          id="programName"
          className="form-control"
          value={programName}
          onChange={(e) => setProgramName(e.target.value)}
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
      <div className="mb-3">
        <label htmlFor="deadline" className="form-label">Application Deadline</label>
        <input
          type="date"
          id="deadline"
          className="form-control"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
};

export default ProgramPromotionForm;
