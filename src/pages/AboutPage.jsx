import React from 'react';
import aboutImage from '../assets/img/about.jpg';
import testimonial1 from '../assets/img/testimonials-1.jpg';


function AboutSection() {
  return (
    <main id="main">
      
      <section id="about" className="about">
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <h2>About</h2>
            <p>CareerPath is a web platform designed to connect students, educational institutions, and companies. Our goal is to provide users with access to available educational programs and career opportunities while offering insights into various career paths and essential steps for success.</p>
          </div>

          <div className="row">
            <div className="col-lg-4">
            <img src={aboutImage} className="img-fluid" alt="" />
            </div>
            <div className="col-lg-8 pt-4 pt-lg-0 content">
              <h3>Our Mission</h3>
              <p className="fst-italic">
                At CareerPath, our mission is to empower students, educational institutions, and companies by facilitating meaningful connections and providing comprehensive career development resources.
              </p>

              <h3>User Benefits</h3>
              <div className="row">
                <div className="col-lg-6">
                  <ul>
                    <li><i className="bi bi-check-circle"></i> <strong>For Students:</strong> Access to a wide range of educational programs, career advice, and networking opportunities.</li>
                    <li><i className="bi bi-check-circle"></i> <strong>For Educational Institutions:</strong> Showcase programs, connect with potential students, and collaborate with employers.</li>
                  </ul>
                </div>
                <div className="col-lg-6">
                  <ul>
                    <li><i className="bi bi-check-circle"></i> <strong>For Companies:</strong> Access to a pool of talented students and professionals, promote job openings, and engage in mentorship programs.</li>
                  </ul>
                </div>
              </div>

              <h3>Unique Features</h3>
              <p>CareerPath offers unique features such as program tracking, career path insights, networking capabilities, and essential tips for career success.</p>

              <h3>Future Vision</h3>
              <p>We aim to evolve and expand CareerPath to better serve our users and the broader community. Our vision includes enhanced features, broader networking opportunities, and deeper insights into career development.</p>

              <h3>Testimonials</h3>
              <p>Here’s what some of our users have to say:</p>
              <ul>
                <li><i className="bi bi-quote"></i> "CareerPath helped me find the perfect internship and provided invaluable career advice." - Student</li>
                <li><i className="bi bi-quote"></i> "As an educator, I can easily connect my students with potential employers." - Educational Institution</li>
                <li><i className="bi bi-quote"></i> "We found several qualified candidates through CareerPath’s network." - Company</li>
              </ul>

              <h3>Call to Action</h3>
              <p>Ready to take the next step in your career? <a href="/auth">Sign up now</a> to start exploring CareerPath’s features and opportunities.</p>
              
              
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" class="testimonials">
      <div class="testimonial-item">
              <img src={testimonial1} className="testimonial-img" alt="" style={{ width: '200px', height: '200px' }} />
              </div>
              </section>
      


    </main>
  );
}


export default AboutSection;
