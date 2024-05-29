import React from 'react';
import { Link } from 'react-router-dom';

function Header({ user, handleSignOut }) {
  return (
    <header id="header" className="fixed-top">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <h1 className="logo me-auto me-lg-0"><Link to="/">CareerPath</Link></h1>
        <nav id="navbar" className="navbar order-last order-lg-0">
          <ul>
            <li className="nav-item"><Link to="/" className="nav-link ">Home</Link></li>
            <li className="nav-item"><Link to="/about" className="nav-link">About</Link></li>
            <li className="nav-item"><Link to="/programs" className="nav-link">Programs</Link></li>
            <li className="nav-item"><Link to="/paths" className="nav-link">Paths</Link></li>
            <li className="nav-item"><Link to="/connections" className="nav-link">Connections</Link></li>
            <li className="nav-item"><Link to="/tips" className="nav-link">Advice</Link></li>
            <li className="nav-item">
              {user ? (
                <div>
                  <Link to="/profile" className="nav-link">{user.email}</Link>
                  <button className="btn btn-warning btn-sm" onClick={handleSignOut}>Logout</button>
                </div>
              ) : (
                <Link to="/auth" className="nav-link btn btn-primary btn-sm">{user ? user.email : 'Login / Sign Up'}</Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
