import React from 'react';
import stepsImage from '../assets/img/steps.png';
import successImage from '../assets/img/success.jpg';

const AdviceSection = () => {
  return (
    <main id="main">

      {/* Advice Section */}
      <section id="advice" className="advice">
        <div className="container" data-aos="fade-up">

          <div className="section-title">
            <h2>Success Tips</h2>
          </div>

          <div className="row advice-content">

            {/* Tip 1 */}
            <div className="col-lg-4 col-md-6 tip">
              <div className="icon-box">
                <div className="icon"><i className="bi bi-book"></i></div>
                <h4 className="title">Explore Education Programs</h4>
                <p className="description"><i>Take the time to research and enroll in educational programs that align with your career goals. Continuous learning is key to staying competitive.</i></p>
              </div>
            </div>

            {/* Tip 2 */}
            <div className="col-lg-4 col-md-6 tip">
              <div className="icon-box">
                <div className="icon"><i className="bi bi-person"></i></div>
                <h4 className="title">Understand the Value of Mentors</h4>
                <p className="description"><i>Mentors provide invaluable guidance and support. Choose mentors who have relevant experience and can offer insights into your desired career path.</i></p>
              </div>
            </div>

            {/* Tip 3 */}
            <div className="col-lg-4 col-md-6 tip">
              <div className="icon-box">
                <div className="icon"><i className="bi bi-laptop"></i></div>
                <h4 className="title">Choose Programs Wisely</h4>
                <p className="description"><i>Select programs that not only interest you but also have a strong reputation and high employment rates for graduates.</i></p>
              </div>
            </div>

            {/* Tip 4 */}
            <div className="col-lg-4 col-md-6 tip">
              <div className="icon-box">
                <div className="icon"><i className="bi bi-journal"></i></div>
                <h4 className="title">Prioritize Your Studies</h4>
                <p className="description"><i>Your academic performance can significantly impact your career opportunities. Dedicate time and effort to excel in your studies.</i></p>
              </div>
            </div>

            {/* Tip 5 */}
            <div className="col-lg-4 col-md-6 tip">
              <div className="icon-box">
                <div className="icon"><i className="bi bi-people"></i></div>
                <h4 className="title">Network with Employers</h4>
                <p className="description"><i>Build relationships with potential employers through internships, job fairs, and networking events. Understanding their needs can help you tailor your skills and experience.</i></p>
              </div>
            </div>

            {/* Tip 6 */}
            <div className="col-lg-4 col-md-6 tip">
              <div className="icon-box">
                <div className="icon"><i className="bi bi-map"></i></div>
                <h4 className="title">Plan Your Career Path</h4>
                <p className="description"><i>Identify the steps needed to achieve your career goals. This includes gaining relevant experience, acquiring new skills, and setting short-term and long-term objectives.</i></p>
              </div>
            </div>

            {/* Tip 7 */}
            <div className="col-lg-4 col-md-6 tip">
              <div className="icon-box">
                <div className="icon"><i className="bi bi-chat"></i></div>
                <h4 className="title">Seek Career Advice</h4>
                <p className="description"><i>Utilize career services and seek advice on resume writing, job interviews, and other critical aspects of career development. Proper preparation can make a significant difference.</i></p>
              </div>
            </div>

            {/* Tip 8 */}
            <div className="col-lg-4 col-md-6 tip">
              <div className="icon-box">
                <div className="icon"><i className="bi bi-lightbulb"></i></div>
                <h4 className="title">Identify Your Strengths</h4>
                <p className="description"><i>Knowing your strengths helps you focus on areas where you can excel and contribute the most.</i></p>
              </div>
            </div>

            {/* Tip 9 */}
            <div className="col-lg-4 col-md-6 tip">
              <div className="icon-box">
                <div className="icon"><i className="bi bi-brightness-high"></i></div>
                <h4 className="title">Embrace Learning</h4>
                <p className="description"><i>Stay curious and open to learning new skills and knowledge. Lifelong learning is essential for career growth.</i></p>
              </div>
            </div>

            {/* Tip 10 */}
            <div className="col-lg-4 col-md-6 tip">
              <div className="icon-box">
                <div className="icon"><i className="bi bi-megaphone"></i></div>
                <h4 className="title">Actively Communicate</h4>
                <p className="description"><i>Effective communication is crucial in any career. Develop strong communication skills to succeed in your professional interactions.</i></p>
              </div>
            </div>

            {/* Tip 11 */}
            <div className="col-lg-4 col-md-6 tip">
              <div className="icon-box">
                <div className="icon"><i className="bi bi-graph-up"></i></div>
                <h4 className="title">Grow Your Network</h4>
                <p className="description"><i>Building a strong professional network can open doors to new opportunities and career advancements.</i></p>
              </div>
            </div>

            {/* Tip 12 */}
            <div className="col-lg-4 col-md-6 tip">
              <div className="icon-box">
                <div className="icon"><i className="bi bi-shield-check"></i></div>
                <h4 className="title">Gain Trust</h4>
                <p className="description"><i>Earning the trust of your colleagues and superiors is essential for career progression. Be reliable and consistent in your work.</i></p>
              </div>
            </div>

            {/* Image 1 */}
            <div className="col-lg-6 mt-4 d-flex justify-content-center">
              <img src={stepsImage} className="img-fluid" style={{ height: '300px' }} width="500px" alt="Steps" />
            </div>

            {/* Image 2 */}
            <div className="col-lg-6 mt-4 d-flex justify-content-center">
              <img src={successImage} className="img-fluid" style={{ height: '300px' }} width="500px" alt="Success" />
            </div>

          </div>

        </div>
      </section>
     
      </main>
  );
};
export default AdviceSection;
