import React, { useState, useEffect } from 'react';
import { addEmployerConnection, addMentorConnection } from '../components/Connections';
import { getDocs, collection, query } from 'firebase/firestore';
import { db } from '../firebase-config';

const ConnectionsSection = ({ companies }) => {
  const [companyOptions, setCompanyOptions] = useState([]);

  useEffect(() => {
    if (companies && companies.length > 0) {
      setCompanyOptions(companies);
    } else {
      fetchCompanyOptions();
    }
  }, [companies]);

  const fetchCompanyOptions = async () => {
    try {
      const companiesSnapshot = await getDocs(query(collection(db, 'jobPostings')));
      const companiesData = companiesSnapshot.docs.map(doc => doc.data().companyName);
      setCompanyOptions([...new Set(companiesData)]);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  const handleSubmit = async (e, connectionType) => {
    e.preventDefault();
    const { name, email, company, message } = e.target.elements;

    if (!name.value || !email.value || !company.value || !message.value) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      if (connectionType === 'employer') {
        await addEmployerConnection({
          name: name.value,
          email: email.value,
          company: company.value,
          message: message.value
        });
      } else if (connectionType === 'mentor') {
        await addMentorConnection({
          name: name.value,
          email: email.value,
          company: company.value,
          message: message.value
        });
      }

      alert("Request submitted successfully!");
      e.target.reset(); // Reset the form after successful submission
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to submit request. Please try again later.");
    }
  };

  return (
    <main id="main">
      <section id="connections" className="connections">
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <h2>Connections</h2>
            <p>Connect with Employers for Job Opportunities & Mentors for Career Guidance</p>
          </div>
          <div className="connections-content">
            <div className="forms-container">
              <h3>Connect with Employers</h3>
              <p><i>Find job opportunities and connect with potential employers in your field.</i></p>
              <form id="employerForm" onSubmit={(e) => handleSubmit(e, 'employer')}>
                <label htmlFor="name">Your Name:</label><br />
                <input type="text" id="name" name="name" required /><br />
                <label htmlFor="email">Your Email:</label><br />
                <input type="email" id="email" name="email" required /><br />
                <label htmlFor="company">Choose the company that you are interested in:</label><br />
                <select id="company" name="company" required>
                  <option value="">Select Company</option>
                  {companyOptions.map((company, index) => (
                    <option key={index} value={company}>{company}</option>
                  ))}
                </select><br />
                <label htmlFor="message">Your Message:</label><br />
                <textarea id="message" name="message" required></textarea><br />
                <button type="submit">Connect</button>
              </form>
            </div>

            <div className="forms-container">
              <h3>Connect with Mentors</h3>
              <p><i>Get guidance and support from experienced mentors to help shape your career path.</i></p>
              <form id="mentorForm" onSubmit={(e) => handleSubmit(e, 'mentor')}>
                <label htmlFor="name">Your Name:</label><br />
                <input type="text" id="name" name="name" required /><br />
                <label htmlFor="email">Your Email:</label><br />
                <input type="email" id="email" name="email" required /><br />
                <label htmlFor="company">Choose the company that you are interested in:</label><br />
                <select id="company" name="company" required>
                  <option value="">Select Company</option>
                  {companyOptions.map((company, index) => (
                    <option key={index} value={company}>{company}</option>
                  ))}
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
