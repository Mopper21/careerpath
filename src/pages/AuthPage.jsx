import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { setDoc, doc} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase-config";

function AuthPage({ updateUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (!email || !password || !userType || (userType === "company" && !companyName)) {
      setErrorMessage("Please fill in all fields.");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: userType,
        companyName: userType === "company" ? companyName : "",
        userId: user.uid,
      });
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
        <p className="text-center mb-4" style={{ fontSize: "15px", fontWeight: "bold", color: "#51687c" }}>
            Connect with professionals and explore career opportunities with CareerPath.
            </p> 
          {successMessage && <div className="alert alert-success">{successMessage}</div>}
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}


          <h4 className="text-center">Register</h4>
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
            {userType === "company" && (
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Company Name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
            )}
            <button
              type="button"
              className="tn btn-primary-custom btn-block mb-3"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
          </form>
          <h4 className="text-center">Sign in</h4>

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
              className="tn btn-primary-custom btn-block mb-3"
              onClick={handleSignIn}
            >
              Sign In
            </button>
          </form>
        


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
