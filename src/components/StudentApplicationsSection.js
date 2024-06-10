import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase-config';

function StudentApplicationsSection({ user }) {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    if (user && user.uid) {
      fetchStudentApplications();
    }
  }, [user]);

  const fetchStudentApplications = async () => {
    try {
      const q = query(collection(db, 'application'), where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      const applicationsList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setApplications(applicationsList);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const handleDeleteApplication = async (applicationId) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        await deleteDoc(doc(db, 'application', applicationId));
        alert('Application deleted successfully!');
        fetchStudentApplications();
      } catch (error) {
        console.error('Error deleting application:', error);
        alert('Failed to delete application. Please try again.');
      }
    }
  };

  const getApplicationStatusText = (status) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmed';
      case 'declined':
        return 'Declined';
      default:
        return 'Waiting...';
    }
  };

  const formatApplicationDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); 
  };

  return (
    <div className="student-applications-section">
      <h3>Your Program's Applications</h3>
      {applications.length > 0 ? (
        <ul>
          {applications.map((application) => (
            <li key={application.id}>
              <p><strong>Program Name:</strong> {application.programName}</p>
              <p><strong>Application Date:</strong> {formatApplicationDate(application.applicationDate)}</p>
              <p><strong>Application Status:</strong> {getApplicationStatusText(application.applicationStatus)}</p>
              <button className="btn btn-danger" onClick={() => handleDeleteApplication(application.id)}>Delete Application</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No applications found.</p>
      )}
    </div>
  );
}

export default StudentApplicationsSection;
