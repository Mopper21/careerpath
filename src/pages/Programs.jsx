import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase-config';
import { collection, getDocs, getDoc, doc, addDoc, onSnapshot } from "firebase/firestore"; 

function ProgramsSection() {
  const [programs, setPrograms] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserRole(userData.role);
          setUserEmail(user.email);
        }
      }
    };

    fetchUserRole();
  }, []);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const programCollection = collection(db, 'program'); // Use 'program' collection
      
        const programsSnapshot = await getDocs(programCollection);
        const programsList = programsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPrograms(programsList);
        
     
        const unsubscribe = onSnapshot(programCollection, (snapshot) => {
          snapshot.docChanges().forEach(change => {
            if (change.type === 'removed') {
              // If a program is removed, reload the page
              window.location.reload();
            }
          });
        });
        
        
        return () => unsubscribe();
      } catch (error) {
        console.error('Error fetching programs:', error);
      }
    };
    
    fetchPrograms();
  }, []);
  

  const handleApplicationSubmit = async (programName) => {
    if (userRole !== 'student') {
      alert('Only students can apply for programs.');
      return;
    }

    if (window.confirm('Are you sure you want to apply for this program?')) {
      try {
      
        await addDoc(collection(db, 'application'), {
          userEmail,
          programName,
          applicationDate: new Date().toISOString()
        });
        alert('Application submitted successfully!');
      } catch (error) {
        console.error('Error submitting application:', error);
        alert('Failed to submit application. Please try again.');
      }
    }
  };


  return (
    <main id="main">
      <section id="programs" className="programs">
        <div className="container" data-aos="fade-up">

          <div className="section-title">
            <h2>Programs</h2>
          </div>

          <div className="row">
            {programs.map(program => (
              <div className="col-lg-6" key={program.id}>
                <h3 className="programs-title">{program.programName}</h3>
                <div className="programs-item">
                  <p><strong>Description:</strong> {program.description}</p>
                  <p><strong>Application Deadline:</strong> {program.deadline}</p>
                  <button className="btn btn-primary" onClick={() => handleApplicationSubmit(program.programName)}>Apply Now</button>
                </div>
              </div>
            ))}
      
       
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProgramsSection;
