import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db, provider } from "../firebase-config";

function AuthPage({ updateUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (!email || !password || !userType) {
      setErrorMessage("Please fill in all fields and select a user type.");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), { email: user.email, role: userType, userId: user.uid });
      setUser(user);
      updateUser(user);
      setSuccessMessage("Registration successful!");
      setErrorMessage("");
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error(error.message);
      setErrorMessage("Registration failed. Please try again.");
    }
  };

  const handleSignIn = async () => {
    if (!loginEmail || !loginPassword) {
      setErrorMessage("Please fill in all fields.");
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      const user = userCredential.user;
      setUser(user);
      updateUser(user);
      setSuccessMessage("Sign-in successful!");
      setErrorMessage("");
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error(error.message);
      setErrorMessage("Sign-in failed. Please try again.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await setDoc(doc(db, "users", user.uid), { email: user.email, role: "google-user", userId: user.uid });
      setUser(user);
      updateUser(user);
      setSuccessMessage("Google sign-in successful!");
      setErrorMessage("");
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error(error.message);
      setErrorMessage("Google sign-in failed. Please try again.");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      updateUser(null);
      setSuccessMessage("You have been logged out!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div id="auth-container" className="auth-container container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">CareerPath - Sign Up / Login</h2>
          {successMessage && <div className="alert alert-success">{successMessage}</div>}
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          
          <form>
            <div className="mb-3">
              <input 
                type="email" 
                className="form-control" 
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
            <div className="mb-3">
              <input 
                type="password" 
                className="form-control" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
            <div className="auth-form-group form-group">
              <label htmlFor="user-type">Choose Role:</label>
              <select 
                id="user-type" 
                className="form-control" 
                value={userType} 
                onChange={(e) => setUserType(e.target.value)}
              >
                <option value="">Select Role</option>
                <option value="student">Student</option>
                <option value="company">Company</option>
                <option value="educational-institution">Educational Institution</option>
              </select>
            </div>
            <button 
              type="button" 
              className="btn btn-primary btn-block mb-3" 
              onClick={handleSignUp}
              style={{ backgroundColor: '#28a745', borderColor: '#28a745' }}
            >
              Sign Up
            </button>
          </form>
          
          <form>
            <div className="mb-3">
              <input 
                type="email" 
                className="form-control" 
                placeholder="Email" 
                value={loginEmail} 
                onChange={(e) => setLoginEmail(e.target.value)} 
              />
            </div>
            <div className="mb-3">
              <input 
                type="password" 
                className="form-control" 
                placeholder="Password" 
                value={loginPassword} 
                onChange={(e) => setLoginPassword(e.target.value)} 
              />
            </div>
            <button 
              type="button" 
              className="btn btn-primary btn-block mb-3" 
              style={{ backgroundColor: '#417dbd', borderColor: '#007bff' }}
              onClick={handleSignIn}
            >
              Sign In
            </button>
          </form>
          
          <button 
            type="button" 
            className="btn btn-primary btn-block mb-3" 
            style={{ backgroundColor: '#db4437', borderColor: '#db4437' }}
            onClick={handleGoogleSignIn}
          >
            Sign Up/In with Google
          </button>

          {user && (
            <div id="user-info" className="mt-4">
              <h4>User Logged In:</h4>
              <p>Email: {user.email}</p>
              <button 
                className="btn btn-warning btn-block" 
                onClick={handleSignOut}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
