import React from 'react';


function HomeSection() {
  return (
    <section id="hero" className="d-flex align-items-center">
      <div className="container d-flex flex-column align-items-center" data-aos="zoom-in" data-aos-delay="100">
        <div id="auth-container" className="text-center">
         
        <div className="icons d-flex justify-content-center">
          <div className="icon mx-3">
            <i className="bi bi-people-fill"></i>
            <p>Connect</p>
          </div>
          <div className="icon mx-3">
            <i className="bi bi-book-fill"></i>
            <p>Learn</p>
          </div>
          <div className="icon mx-3">
            <i className="bi bi-trophy-fill"></i>
            <p>Succeed</p>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}

export default HomeSection;
