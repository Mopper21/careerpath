// src/pages/Connections.jsx
import React from 'react';
import { handleEmployerSubmit, handleMentorSubmit } from '../components/Connections';

const ConnectionsSection = () => {
  return (
    <main id="main">
      <section id="connections" className="connections">
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <h2>Connections</h2>
            <p>Connect with potential employers and mentors</p>
          </div>
          <div className="connections-content">
            <div className="forms-container">
              <h3>Connect with Employers</h3>
              <p><i>Find job opportunities and connect with potential employers in your field.</i></p> <br />
              <form id="employerForm" onSubmit={handleEmployerSubmit}>
                <label htmlFor="name">Your Name:</label><br />
                <input type="text" id="name" name="name" required /><br />
                <label htmlFor="email">Your Email:</label><br />
                <input type="email" id="email" name="email" required /><br />
                <label htmlFor="program">Choose the program that you are interested in:</label><br />
                <select id="program" name="program" required>
                  <option value="">Select Program</option>
                  <option value="Introduction to Programming">Introduction to Programming</option>
                  <option value="Digital Marketing Certification">Digital Marketing Certification</option>
                  <option value="Financial Literacy Workshop">Financial Literacy Workshop</option>
                  <option value="Graphic Design Bootcamp">Graphic Design Bootcamp</option>
                  <option value="Data Science Fundamentals">Data Science Fundamentals</option>
                </select><br />
                <label htmlFor="company">Choose the company that you are interested in:</label><br />
                <select id="company" name="company" required>
                  <option value="">Select Company</option>
                  <option value="Tech Corp">Tech Corp</option>
                  <option value="Marketing Inc.">Marketing Inc.</option>
                  <option value="Business Solutions Ltd.">Business Solutions Ltd.</option>
                  <option value="Creative Designs">Creative Designs</option>
                  <option value="Data Analytics Co.">Data Analytics Co.</option>
                </select><br />
                <label htmlFor="message">Your Message:</label><br />
                <textarea id="message" name="message" required></textarea><br />
                <button type="submit">Connect</button>
              </form>
            </div>

            <div className="forms-container">
              <h3>Connect with Mentors</h3>
              <p><i>Get guidance and support from experienced mentors to help shape your career path.</i></p> <br />
              <form id="mentorForm" onSubmit={handleMentorSubmit}>
                <label htmlFor="name">Your Name:</label><br />
                <input type="text" id="name" name="name" required /><br />
                <label htmlFor="email">Your Email:</label><br />
                <input type="email" id="email" name="email" required /><br />
                <label htmlFor="program">Choose the program that you are interested in:</label><br />
                <select id="program" name="program" required>
                  <option value="">Select Program</option>
                  <option value="Introduction to Programming">Introduction to Programming</option>
                  <option value="Digital Marketing Certification">Digital Marketing Certification</option>
                  <option value="Financial Literacy Workshop">Financial Literacy Workshop</option>
                  <option value="Graphic Design Bootcamp">Graphic Design Bootcamp</option>
                  <option value="Data Science Fundamentals">Data Science Fundamentals</option>
                </select><br />
                <label htmlFor="company">Choose the company that you are interested in:</label><br />
                <select id="company" name="company" required>
                  <option value="">Select Company</option>
                  <option value="Tech Corp">Tech Corp</option>
                  <option value="Marketing Inc.">Marketing Inc.</option>
                  <option value="Business Solutions Ltd.">Business Solutions Ltd.</option>
                  <option value="Creative Designs">Creative Designs</option>
                  <option value="Data Analytics Co.">Data Analytics Co.</option>
                </select><br />
                <label htmlFor="message">Your Message:</label><br />
                <textarea id="message" name="message" required></textarea><br />
                <button type="submit">Connect</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ConnectionsSection;