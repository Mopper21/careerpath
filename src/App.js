import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import HomeSection from './pages/HomePage';
import Header from './pages/Header';
import './App.css';
import Footer from './pages/Footer';
import AboutSection from './pages/AboutPage';
import ProgramsSection from './pages/Programs';
import JobOpportunities from './pages/CareerPathsPage';
import ConnectionsSection from './pages/Connections';
import AdviceSection from './pages/Tips';
import ProfilePage from './pages/ProfilePage';
import React, { useState } from 'react';

function App() {
  const [user, setUser] = useState(null);

  const updateUser = (userData) => {
    setUser(userData);
  };

  const handleSignOut = () => {
    // Implement sign-out logic here
    setUser(null);
  };

  return (
    <Router>
      <Header user={user} handleSignOut={handleSignOut} />
      <Routes>
        <Route path="/" element={<HomeSection />} />
        <Route path="/auth" element={<AuthPage updateUser={updateUser} />} />
        <Route path="/about" element={<AboutSection />} />
        <Route path="/programs" element={<ProgramsSection />} />
        <Route path="/paths" element={<JobOpportunities />} />
        <Route path="/connections" element={<ConnectionsSection />} />
        <Route path="/tips" element={<AdviceSection />} />
        <Route path="/profile" element={<ProfilePage user={user} handleSignOut={handleSignOut} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
