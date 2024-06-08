import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase-config';

const CompanyDashboard = ({ company }) => {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!company) {
      console.error('Company prop is undefined');
      setIsLoading(false);
      return;
    }

    const fetchContacts = async () => {
      try {
        const employerConnectionsQuery = query(
          collection(db, 'employerConnections'),
          where('company', '==', company)
        );
        const employerConnectionsSnapshot = await getDocs(employerConnectionsQuery);
        const employerConnections = employerConnectionsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          type: 'Employer'
        }));

        const mentorConnectionsQuery = query(
          collection(db, 'mentorConnections'),
          where('company', '==', company)
        );
        const mentorConnectionsSnapshot = await getDocs(mentorConnectionsQuery);
        const mentorConnections = mentorConnectionsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          type: 'Mentor'
        }));

        // Merge the two arrays
        setContacts([...employerConnections, ...mentorConnections]);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching contacts:', error);
        setIsLoading(false);
      }
    };

    fetchContacts();
  }, [company]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main id="main">
      <section id="dashboard" className="dashboard">
        <div/><br></br>
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <h2>Company Dashboard</h2>
            <p>Review submitted contacts from students</p>
          </div>
          <div className="contacts-content">
            {contacts.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Message</th>
                    <th>Seeking connection with:</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact) => (
                    <tr key={contact.id}>
                      <td>{contact.name}</td>
                      <td>{contact.email}</td>
                      <td>{contact.message}</td>
                      <td>{contact.type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No contacts found.</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default CompanyDashboard;
