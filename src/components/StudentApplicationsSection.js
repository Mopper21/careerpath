import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where, deleteDoc } from 'firebase/firestore';
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
    try {
      await deleteDoc(doc(db, 'application', applicationId));
      setApplications((prevApplications) => prevApplications.filter(app => app.id !== applicationId));
      console.log('Application deleted successfully!');
    } catch (error) {
      console.error('Error deleting application:', error);
    }
  };

  return (
    <div className="student-applications-section">
      <h3>Your Applications</h3>
      {applications.length > 0 ? (
        <ul>
          {applications.map((application) => (
            <li key={application.id}>
              <p><strong>Program Name:</strong> {application.programName}</p>
              <p><strong>Application Date:</strong> {application.applicationDate}</p>
              <button onClick={() => handleDeleteApplication(application.id)}>Delete</button> {/* Delete button */}
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
