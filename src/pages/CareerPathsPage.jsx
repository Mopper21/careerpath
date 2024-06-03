//careerPaths
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase-config';

const CareerPathsPage = () => {
  const [submittedPaths, setSubmittedPaths] = useState([]);

  useEffect(() => {
    const fetchSubmittedPaths = async () => {
      try {
        const pathsSnapshot = await getDocs(collection(db, 'jobPostings'));
        const pathsData = pathsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setSubmittedPaths(pathsData);
      } catch (error) {
        console.error('Error fetching submitted paths:', error);
      }
    };

    fetchSubmittedPaths();
  }, []);

  return (
    <main id="main">
      <section id="services" className="services">
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <h2>Career/Job Opportunities</h2>
            <p></p>
          </div>
          <div className="row">
            {submittedPaths.map((path, index) => (
              <div 
                className="col-lg-4 col-md-6 d-flex align-items-stretch" 
                data-aos="zoom-in" 
                data-aos-delay={100 * (index + 1)} 
                key={index}
              >
                <div className="icon-box">
                  <div className="content">
                    <div className="icon"><i className="bi bi-briefcase-fill"></i></div>
                    <h4>{path.title}</h4>
                    <p>{path.description}</p>
                  </div>
                  <div className="company">
                    <p><strong>Company:</strong> {path.companyName}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default CareerPathsPage;
