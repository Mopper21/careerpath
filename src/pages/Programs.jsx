import React, { useState, useEffect } from 'react';
import { toggleForm, validateForm } from '../components/ProgramsUtils';
import { auth, db } from '../firebase-config';
import { collection, getDoc, doc } from "firebase/firestore"; 

function ProgramsSection() {
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

  const handleApplicationSubmit = (programName) => {
    if (userRole !== 'student') {
      alert('Only students can apply for programs.');
      return;
    }

    if (window.confirm('Are you sure you want to apply for this program?')) {
      validateForm(userEmail, programName);
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
            <div className="col-lg-6">
              <h3 className="programs-title">Introduction to Programming</h3>
              <div className="programs-item">
                <p>Description: Learn the basics of programming languages such as Python, C++, JavaScript, and Java. Explore fundamental concepts like variables, loops, objects and functions.</p>
                <p>Application Deadline: June 30, 2024</p>
                <button className="btn btn-primary" onClick={() => handleApplicationSubmit('Introduction to Programming')}>Apply Now</button>
              </div>
            </div>

            <div className="col-lg-6">
              <h3 className="programs-title">Digital Marketing Certification</h3>
              <div className="programs-item">
                <p>Description: Gain expertise in digital marketing strategies, including SEO, social media marketing, email marketing, and content creation. Learn to analyze marketing data and optimize campaigns.</p>
                <p>Application Deadline: July 15, 2024</p>
                <button className="btn btn-primary" onClick={() => handleApplicationSubmit('Digital Marketing Certification')}>Apply Now</button>
              </div>
            </div>

            <div className="col-lg-6">
              <h3 className="programs-title">Financial Literacy Workshop</h3>
              <div className="programs-item">
                <p>Description: Understand the principles of personal finance, budgeting, investing, and retirement planning. Learn how to manage debt, build credit, and achieve financial goals.</p>
                <p>Application Deadline: August 10, 2024</p>
                <button className="btn btn-primary" onClick={() => handleApplicationSubmit('Financial Literacy Workshop')}>Apply Now</button>
              </div>
            </div>

            <div className="col-lg-6">
              <h3 className="programs-title">Graphic Design Bootcamp</h3>
              <div className="programs-item">
                <p>Description: Develop skills in graphic design software like Adobe Photoshop, Illustrator, and InDesign. Learn design principles, typography, color theory, and digital illustration techniques.</p>
                <p>Application Deadline: September 5, 2024</p>
                <button className="btn btn-primary" onClick={() => handleApplicationSubmit('Graphic Design Bootcamp')}>Apply Now</button>
              </div>
            </div>

            <div className="col-lg-6">
              <h3 className="programs-title">Data Science Fundamentals</h3>
              <div className="programs-item">
                <p>Description: Dive into the world of data science and analytics. Explore data visualization, statistical analysis, machine learning, and predictive modeling using tools like Python and R.</p>
                <p>Application Deadline: October 1, 2024</p>
                <button className="btn btn-primary" onClick={() => handleApplicationSubmit('Data Science Fundamentals')}>Apply Now</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProgramsSection;
