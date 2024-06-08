import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase-config';

function ApplicationsSection({ user }) {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    if (user && user.uid) {
      fetchApplications();
    }
  }, [user]);

  const fetchApplications = async () => {
    try {
      const programIds = await getUserProgramIds(user.uid);
      if (programIds.length > 0) {
        const q = query(collection(db, 'applications'), where('programId', 'in', programIds));
        const querySnapshot = await getDocs(q);
        const applicationsList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setApplications(applicationsList);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const getUserProgramIds = async (userId) => {
    const programIds = [];
    const programsQuery = query(collection(db, 'programs'), where('userId', '==', userId));
    const programsSnapshot = await getDocs(programsQuery);
    programsSnapshot.forEach((doc) => {
      programIds.push(doc.id);
    });
    return programIds;
  };

  const formatApplicationDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // or use date.toLocaleString() for more detailed format
  };

  return (
    <div className="applications-section">
      <h3>Program Applications</h3>
      {applications.length > 0 ? (
        <ul>
          {applications.map((application) => (
            <li key={application.id}>
              <p><strong>Application ID:</strong> {application.id}</p>
              <p><strong>User ID:</strong> {application.userId}</p>
              <p><strong>Program ID:</strong> {application.programId}</p>
              <p><strong>Program Name:</strong> {application.programName}</p>
              <p><strong>User Email:</strong> {application.userEmail}</p>
              <p><strong>Application Date:</strong> {formatApplicationDate(application.applicationDate)}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No applications found.</p>
      )}
    </div>
  );
}

export default ApplicationsSection;
