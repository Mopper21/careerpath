import React from 'react';

const ConnectionsSection = () => {
  return (
    <main id="main">
      <section id="connections" className="connections">
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <h2>Connections</h2>
            <p></p>
          </div>
          <div className="connections-content">
            <div className="forms-container">
              <h3>Connect with Employers</h3>
              <p><i>Find job opportunities and connect with potential employers in your field.</i></p> <br />
              <form id="employerForm">
                <label htmlFor="name">Your Name:</label><br />
                <input type="text" id="name" name="name" required /><br />
                <label htmlFor="email">Your Email:</label><br />
                <input type="email" id="email" name="email" required /><br />
                <label id="programLabel" htmlFor="program">Choose the program that you are interested in:</label><br />
                <select id="program" name="program">
                  <option value="Introduction to Programming">Introduction to Programming</option>
                  <option value="Digital Marketing Certification">Digital Marketing Certification</option>
                  <option value="Financial Literacy Workshop">Financial Literacy Workshop</option>
                  <option value="Graphic Design Bootcamp">Graphic Design Bootcamp</option>
                  <option value="Data Science Fundamentals">Data Science Fundamentals</option>
                </select><br />
                <label id="pathLabel" htmlFor="path">Choose the company that you are interested in:</label><br />
                <select id="program" name="program">
                  <option value="Introduction to Programming">Tech Corp</option>
                  <option value="Digital Marketing Certification">Marketing Inc.</option>
                  <option value="Financial Literacy Workshop">Business Solutions Ltd.</option>
                  <option value="Graphic Design Bootcamp">Creative Designs</option>
                  <option value="Data Science Fundamentals">Data Analytics Co.</option>
                </select><br />
                <label htmlFor="message">Your Message:</label><br />
                <textarea id="message" name="message" required></textarea><br />
                <button type="submit">Connect</button>
              </form>
            </div>

            <div className="forms-container">
              <h3>Connect with Mentors</h3>
              <p><i>Get guidance and support from experienced mentors to help shape your career path.</i></p> <br />
              <form id="mentorForm">
                <label htmlFor="name">Your Name:</label><br />
                <input type="text" id="name" name="name" required /><br />
                <label htmlFor="email">Your Email:</label><br />
                <input type="email" id="email" name="email" required /><br />
                <label id="programLabel" htmlFor="program">Choose the program that you are interested in:</label><br />
                <select id="program" name="program">
                  <option value="Introduction to Programming">Introduction to Programming</option>
                  <option value="Digital Marketing Certification">Digital Marketing Certification</option>
                  <option value="Financial Literacy Workshop">Financial Literacy Workshop</option>
                  <option value="Graphic Design Bootcamp">Graphic Design Bootcamp</option>
                  <option value="Data Science Fundamentals">Data Science Fundamentals</option>
                </select><br />
                <label id="pathLabel" htmlFor="path">Choose the company that you are interested in:</label><br />
                <select id="program" name="program">
                  <option value="Introduction to Programming">Tech Corp</option>
                  <option value="Digital Marketing Certification">Marketing Inc.</option>
                  <option value="Financial Literacy Workshop">Business Solutions Ltd.</option>
                  <option value="Graphic Design Bootcamp">Creative Designs</option>
                  <option value="Data Science Fundamentals">Data Analytics Co.</option>
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
