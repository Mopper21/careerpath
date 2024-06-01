import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase-config';
import { collection, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc, onSnapshot } from "firebase/firestore"; 
import JobEditForm from '../components/JobEditForm';

function CareerPathsPage() {
  const [jobs, setJobs] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userId, setUserId] = useState(null);
  const [editingJobId, setEditingJobId] = useState(null); // State to track editing job

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
    const fetchJobs = async () => {
      try {
        const jobCollection = collection(db, 'jobPostings');
        const jobsSnapshot = await getDocs(jobCollection);
        const jobsList = jobsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setJobs(jobsList);

        const unsubscribe = onSnapshot(jobCollection, (snapshot) => {
          snapshot.docChanges().forEach(change => {
            if (change.type === 'removed') {
              setJobs(prevJobs => prevJobs.filter(job => job.id !== change.doc.id));
            } else if (change.type === 'modified') {
              setJobs(prevJobs => prevJobs.map(job => 
                job.id === change.doc.id ? { id: change.doc.id, ...change.doc.data() } : job
              ));
            }
          });
        });

        return () => unsubscribe();
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  
  const handleDeleteJob = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await deleteDoc(doc(db, 'jobPostings', jobId));
        alert('Job deleted successfully!');
      } catch (error) {
        console.error('Error deleting job:', error);
        alert('Failed to delete job. Please try again.');
      }
    }
  };

  const handleEditJob = (jobId) => {
    setEditingJobId(jobId);
  };

  const handleSaveJob = async (updatedJob) => {
    if (editingJobId) {
      try {
        await updateDoc(doc(db, 'jobPostings', editingJobId), updatedJob);
        alert('job updated successfully!');
      } catch (error) {
        console.error('Error updating job:', error);
        alert('Failed to update job. Please try again.');
      }
      setEditingJobId(null);
    }
  };

  return (
    <main id="main">
      <section id="jobs" className="jobs">
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <h2>Job Openings</h2>
          </div>
          <div className="row">
            {jobs.map(job => (
              <div className="col-lg-5" key={job.id}>
                <h3 className="jobs-title">{job.jobName}</h3>
                <div className="jobs-item">
                  <p><strong>Description:</strong> {job.description}</p>
                  
                  {userRole === 'company' && (
                    <>
                      <button className="btn btn-warning" onClick={() => handleEditJob(job.id)}>Edit</button>
                      <button className="btn btn-danger" onClick={() => handleDeleteJob(job.id)}>Delete</button>
                    </>
                  )}
                </div>
                {/* Render the JobEditForm only if editingJobId matches the current job id */}
                {editingJobId === job.id && (
                  <JobEditForm
                    job={job}
                    onSave={handleSaveJob}
                    onCancel={() => setEditingJobId(null)}
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

export default CareerPathsPage;
