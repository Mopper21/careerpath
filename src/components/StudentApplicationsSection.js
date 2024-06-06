import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore'; // Import doc function
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
        fetchStudentApplications(); // Refresh the list after deletion
      } catch (error) {
        console.error('Error deleting application:', error);
        alert('Failed to delete application. Please try again.');
      }
    }
  };

  return (
    <div className="student-applications-section ">
      <h3>Your Applications</h3>
      {applications.length > 0 ? (
        <ul>
          {applications.map((application) => (
            <li key={application.id}>
              
              <p><strong>Program Name:</strong> {application.programName}</p>
              <p><strong>Application Date:</strong> {application.applicationDate}</p>
              <p><strong>Application Status: {/*application.status*/}</strong></p>
              <p><strong>Application ID:</strong> {application.applicationId}</p>
              <button className="btn btn-danger" onClick={() => handleDeleteApplication(application.id)}>Delete</button>
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
