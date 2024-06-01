import React from 'react';
import ProfilePageLogic from '../components/ProfilePageLogic';
import ProgramPromotionForm from '../components/ProgramPromotionForm';
import JobPostingForm from '../components/JobPostingForm';
import JobOpportunities from './CareerPathsPage';
import ProgramsSection from './Programs';

function ProfilePage({ user, handleSignOut }) {
  const { 
    name, dateOfBirth, userRole, profilePicture, 
    loading, selectedFileName, handleFileChange, 
    handleSave, handleInputChange, fileInputRef 
  } = ProfilePageLogic({ user, handleSignOut });

  return (
    <main id="main">
      <section id="profile" className="profile">
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <h2>Profile</h2>
          </div>

          {loading ? (
            <div className="loading-spinner">Loading...</div>
          ) : user ? (
            <div className="profile-content">
              <div className="card">
                <div className="card-body">
                  <div className="profile-picture">
                    <img src={profilePicture} alt="Profile" />
                    <div className="custom-file-upload">
                      <button 
                        className="btn btn-secondary"
                        onClick={() => fileInputRef.current.click()}
                      >
                        {profilePicture ? 'Change Profile Picture' : 'Upload New Profile Picture'}
                      </button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                      />
                      {selectedFileName && <p>{selectedFileName}</p>}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" id="email" className="form-control" value={user.email} readOnly />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                      type="text"
                      id="name"
                      className="form-control"
                      value={name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
                    <input
                      type="date"
                      id="dateOfBirth"
                      className="form-control"
                      value={dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="userRole" className="form-label">User Type</label>
                    <input
                      type="text"
                      id="userRole"
                      className="form-control"
                      value={userRole}
                      readOnly
                    />
                  </div>
                  <div className="d-flex justify-content-between">
                    <button className="btn btn-primary" onClick={handleSave}>Save</button>
                    <button className="btn btn-warning" onClick={handleSignOut}>Logout</button>
                  </div>
                  {userRole === 'company' && (
                    <div className="mb-3">
                      <h3>Post Job Opportunity</h3>
                      <JobPostingForm />
                      <JobOpportunities />
                    </div>
                  )}
                  {userRole === 'educational-institution' && (
                    <div className="mb-3">
                      <h3>Promote a New Program</h3>
                      <ProgramPromotionForm />
                      <ProgramsSection />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </section>
    </main>
  );
}

export default ProfilePage;
