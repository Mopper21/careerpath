import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase-config'; // Ensure auth is imported
import { addDoc, collection, updateDoc, doc } from 'firebase/firestore';

const ProgramPromotionForm = ({ initialUserName }) => {
  const [programName, setProgramName] = useState('');
  const [description, setDescription] = useState('');
  const [submissionDate, setSubmissionDate] = useState('');
  const [deadline, setDeadline] = useState('');
  const [programId, setProgramId] = useState(null);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setSubmissionDate(today);
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      if (!user) {
        alert('You must be logged in to add a program.');
        return;
      }

      // Add the new program to Firestore
      const docRef = await addDoc(collection(db, 'program'), {
        programName,
        description,
        submissionDate,
        deadline,
        creatorId: user.uid, // Store the creator's ID
      });

      // Get the document ID and update the document with the programId
      const id = docRef.id;
      await updateDoc(doc(db, 'program', id), { programId: id });

      alert('New program added successfully!');
      // Clear form fields after submission
      setProgramName('');
      setDescription('');
      setDeadline('');
      setProgramId(id);
    } catch (error) {
      console.error('Error adding new program:', error);
      alert('Failed to add new program. Please try again.');
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
       <h3>Add a Program</h3>
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