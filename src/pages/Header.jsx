import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header({ user, handleSignOut }) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  console.log("User in Header:", user);

  return (
    <header id="header" className="fixed-top">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <h1 className="logo me-auto me-lg-0"><Link to="/">CareerPath</Link></h1>
        <nav id="navbar" className={`navbar ${isMobileMenuOpen ? 'navbar-mobile' : ''}`}>
          <ul>
            <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
            <li className="nav-item"><Link to="/about" className="nav-link">About</Link></li>
            <li className="nav-item"><Link to="/programs" className="nav-link">Programs</Link></li>
            <li className="nav-item"><Link to="/paths" className="nav-link">Paths</Link></li>
            {user && (user.role === 'company' || user.role === 'student') && (
      <li className="nav-item"><Link to="/connections" className="nav-link">Connections</Link></li>
    )}
            <li className="nav-item"><Link to="/tips" className="nav-link">Tips</Link></li>
            <li className="nav-item">
              {user ? (
                <div>
                  <Link to="/profile" className="nav-link">{user.email}</Link>
                  {location.pathname !== '/profile' && (
                    <button className="btn btn-warning btn-sm" onClick={handleSignOut}>Logout</button>
                  )}
                </div>
              ) : (
                <Link to="/auth" className="nav-link btn btn-primary btn-sm">{user ? user.email : 'Login / Register'}</Link>
              )}
            </li>
          </ul>
          <i className={`bi ${isMobileMenuOpen ? 'bi-x' : 'bi-list'} mobile-nav-toggle`} onClick={toggleMobileMenu}></i>
        </nav>
      </div>
    </header>
  );
}

export default Header;
