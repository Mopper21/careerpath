import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, getDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

function ApplicationsSection({ user }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.uid) {
      fetchApplications();
    }
  }, [user]);

  const fetchApplications = async () => {
    try {
      const programIds = await getUserProgramIds(user.uid);
      if (programIds.length > 0) {
        const q = query(collection(db, 'application'), where('programId', 'in', programIds));
        const querySnapshot = await getDocs(q);
        const applicationsList = await Promise.all(
          querySnapshot.docs.map(async (applicationDoc) => {
            const applicationData = applicationDoc.data();
            const userDocRef = doc(db, 'users', applicationData.userId);
            const userDoc = await getDoc(userDocRef);
            const userData = userDoc.exists() ? userDoc.data() : {};
            return { id: applicationDoc.id, ...applicationData, userData };
          })
        );
        setApplications(applicationsList);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const getUserProgramIds = async (userId) => {
    const programIds = [];
    const programsQuery = query(collection(db, 'program'), where('creatorId', '==', userId));
    const programsSnapshot = await getDocs(programsQuery);
    programsSnapshot.forEach((programDoc) => {
      programIds.push(programDoc.id);
    });
    return programIds;
  };

  const handleApprove = async (applicationId) => {
    try {
      const applicationDocRef = doc(db, 'application', applicationId);
      await updateDoc(applicationDocRef, { status: 'Approved' });
      fetchApplications(); // Refresh the list of applications
    } catch (error) {
      console.error('Error approving application:', error);
    }
  };

  const formatApplicationDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // or use date.toLocaleString() for more detailed format
  };

  return (
    <div className="applications-section">
      <h3>Program Applications</h3>
      {loading ? (
        <p>Loading applications...</p>
      ) : applications.length > 0 ? (
        <ul>
          {applications.map((application) => (
            <li key={application.id}>
              <p><strong>Program Name:</strong> {application.programName}</p>
              <p><strong>User Name:</strong> {application.userData.name}</p>
              <p><strong>User Email:</strong> {application.userData.email}</p>
              <p><strong>Application Date:</strong> {formatApplicationDate(application.applicationDate)}</p>
              <p><strong>Application Status:</strong> {application.status}</p>
              {application.status === 'Waiting for approval' && (
                <button className="btn btn-danger" onClick={() => handleApprove(application.id)}>Approve</button>
              )}
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
