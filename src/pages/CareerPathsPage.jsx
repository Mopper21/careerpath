// CareerPathsPage.jsx
import React, { useEffect, useState } from 'react';
import { db } from '../firebase-config';

const CareerPathsPage = () => {
  const [submittedPaths, setSubmittedPaths] = useState([]);

  useEffect(() => {
    const fetchSubmittedPaths = async () => {
      try {
        const pathsSnapshot = await db.collection('submittedPaths').get();
        const pathsData = pathsSnapshot.docs.map(doc => doc.data());
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
                    <div className="icon"><i className={path.icon}></i></div>
                    <h4><a href="">{path.title}</a></h4>
                    <p>{path.description}</p>
                  </div>
                  <div className="company">
                    <p><strong>Company:</strong> {path.company}</p>
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
