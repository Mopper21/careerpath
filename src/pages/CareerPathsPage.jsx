import React from 'react';


const JobOpportunities = () => {
  const opportunities = [
    {
      icon: 'bx bx-code',
      title: 'Software Development',
      description: 'Explore the path to becoming a software developer. Learn about essential programming languages, software development methodologies, and key skills required for success.',
      company: 'Tech Corp'
    },
    {
      icon: 'bx bx-line-chart',
      title: 'Digital Marketing',
      description: 'Understand the steps to build a career in digital marketing. Gain insights into SEO, content marketing, social media strategies, and data analytics.',
      company: 'Marketing Inc.'
    },
    {
      icon: 'bx bx-briefcase',
      title: 'Business Management',
      description: 'Discover the route to a successful career in business management. Learn about leadership skills, strategic planning, and effective business operations.',
      company: 'Business Solutions Ltd.'
    },
    {
      icon: 'bx bx-bar-chart-alt',
      title: 'Data Science',
      description: 'Get insights into the field of data science. Understand the importance of data analysis, machine learning, and statistical modeling in driving business decisions.',
      company: 'Data Analytics Co.'
    },
    {
      icon: 'bx bx-palette',
      title: 'Graphic Design',
      description: 'Learn the creative path to becoming a graphic designer. Explore design principles, tools, and techniques to create visually appealing content.',
      company: 'Creative Designs'
    },
    {
      icon: 'bx bx-hive',
      title: 'Cybersecurity',
      description: 'Delve into the critical field of cybersecurity. Understand the strategies for protecting digital assets, managing security risks, and responding to cyber threats.',
      company: 'Security Experts'
    },
  ];

  return (
    <main id="main">
      <section id="services" className="services">
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <h2>Career/Job Opportunities</h2>
            <p></p>
          </div>
          <div className="row">
            {opportunities.map((opportunity, index) => (
              <div 
                className="col-lg-4 col-md-6 d-flex align-items-stretch" 
                data-aos="zoom-in" 
                data-aos-delay={100 * (index + 1)} 
                key={index}
              >
                <div className="icon-box">
                  <div className="content">
                    <div className="icon"><i className={opportunity.icon}></i></div>
                    <h4><a href="">{opportunity.title}</a></h4>
                    <p>{opportunity.description}</p>
                  </div>
                  <div className="company">
                    <p><strong>Company:</strong> {opportunity.company}</p>
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

export default JobOpportunities;
