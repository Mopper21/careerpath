//app.js
import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import HomeSection from './pages/HomePage';
import Header from './pages/Header';
import Footer from './pages/Footer';
import AboutSection from './pages/AboutPage';
import ProgramsSection from './pages/Programs';
import JobOpportunities from './pages/CareerPathsPage';
import ConnectionsSection from './pages/Connections';
import AdviceSection from './pages/Tips';
import ProfilePage from './pages/ProfilePage';
import CompanyDashboard from './pages/CompanyDashboard';
import { db, auth } from './firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [companies, setCompanies] = useState([]);

  const updateUser = (userData) => {
    setUser(userData);
  };

  const handleSignOut = () => {
    auth.signOut();
    setUser(null);
  };

  useEffect(() => {
    const fetchUserData = async (uid) => {
      try {
        const userDoc = await getDoc(doc(db, 'users', uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          console.log("Fetched user data from Firestore:", data); // Debugging line
          return data;
        } else {
          console.log('No such document!');
          return null;
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
      }
    };
  
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await fetchUserData(user.uid);
        if (userData) {
          const newUser = { ...user, role: userData.role, name: userData.name };
          console.log("New User Data:", newUser); // Debugging line
          setUser(newUser);
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });
  
    return () => unsubscribe();
  }, []);
  
  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Header user={user} handleSignOut={handleSignOut} />
      <Routes>
        <Route path="/" element={<HomeSection />} />
        <Route path="/auth" element={<AuthPage updateUser={updateUser} />} />
        <Route path="/about" element={<AboutSection />} />
        <Route path="/programs" element={<ProgramsSection />} />
        <Route path="/paths" element={<JobOpportunities />} />
        <Route
  path="/connections"
  element={
    user ? (
      user.role === 'company' ? (
        <>
          {console.log("Passing company prop to CompanyDashboard:", user.name)}
          <CompanyDashboard company={user.name} />
        </>
      ) : (
        <ConnectionsSection companies={companies} />
      )
    ) : (
      <AuthPage updateUser={updateUser} />
    )
  }
/>


        <Route path="/tips" element={<AdviceSection />} />
        <Route path="/profile" element={<ProfilePage user={user} handleSignOut={handleSignOut} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
