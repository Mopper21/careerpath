import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase-config';
import { collection, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc, onSnapshot } from "firebase/firestore"; 
import ProgramEditForm from '../components/ProgramEditForm';

function ProgramsSection() {
  const [programs, setPrograms] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userId, setUserId] = useState(null);
  const [editingProgramId, setEditingProgramId] = useState(null); // State to track editing program

  useEffect(() => {
    const fetchUserRole = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserRole(userData.role);
          setUserEmail(user.email);
          setUserId(user.uid);
        }
      }
    };

    fetchUserRole();
  }, []);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const programCollection = collection(db, 'program');
        const programsSnapshot = await getDocs(programCollection);
        const programsList = programsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPrograms(programsList);

        const unsubscribe = onSnapshot(programCollection, (snapshot) => {
          snapshot.docChanges().forEach(change => {
            if (change.type === 'removed') {
              setPrograms(prevPrograms => prevPrograms.filter(program => program.id !== change.doc.id));
            } else if (change.type === 'modified') {
              setPrograms(prevPrograms => prevPrograms.map(program => 
                program.id === change.doc.id ? { id: change.doc.id, ...change.doc.data() } : program
              ));
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

  const handleDeleteProgram = async (programId) => {
    if (window.confirm('Are you sure you want to delete this program?')) {
      try {
        await deleteDoc(doc(db, 'program', programId));
        alert('Program deleted successfully!');
      } catch (error) {
        console.error('Error deleting program:', error);
        alert('Failed to delete program. Please try again.');
      }
    }
  };

  const handleEditProgram = (programId) => {
    setEditingProgramId(programId);
  };

  const handleSaveProgram = async (updatedProgram) => {
    if (editingProgramId) {
      try {
        await updateDoc(doc(db, 'program', editingProgramId), updatedProgram);
        alert('Program updated successfully!');
      } catch (error) {
        console.error('Error updating program:', error);
        alert('Failed to update program. Please try again.');
      }
      setEditingProgramId(null);
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
                  {userRole === 'student' && (
                    <button className="btn btn-primary" onClick={() => handleApplicationSubmit(program.programName)}>Apply Now</button>
                  )}
                  {userRole === 'educational-institution' && (
                    <>
                      <button className="btn btn-warning" onClick={() => handleEditProgram(program.id)}>Edit</button>
                      <button className="btn btn-danger" onClick={() => handleDeleteProgram(program.id)}>Delete</button>
                    </>
                  )}
                </div>
                {/* Render the ProgramEditForm only if editingProgramId matches the current program id */}
                {editingProgramId === program.id && (
                  <ProgramEditForm
                    program={program}
                    onSave={handleSaveProgram}
                    onCancel={() => setEditingProgramId(null)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProgramsSection;
