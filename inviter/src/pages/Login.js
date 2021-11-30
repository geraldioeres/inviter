import React, { useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import "./Login.css";

function Login() {
  const [user, setUser] = useState({});
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
      sessionStorage.setItem("Auth Token", user._tokenResponse.refreshToken);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="login">
      <div className="container" style={{maxWidth: "500px", padding: "0 20px", margin: "160px auto"}}>
        <div className="login-wrapper">
          <h1 className="form-title">Login</h1>
          <form className="form-container">
            <div className="login-form">
              <label className="login-label">Email Address</label>
              <input
                type="email"
                className="login-input"
                placeholder="Email Address"
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div className="login-form">
              <label className="login-label">Password</label>
              <input
                type="text"
                className="login-input"
                placeholder="Password"
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <div className="login-form">
              <button onClick={login} className="login-button">
                Log In
              </button>
            </div>
            <div className="login-form">
              <span className="login-signup">
                Don't have an account?{" "}
                <a href="/signup" className="signup-link">
                  Sign Up Now!
                </a>
              </span>
            </div>
            {user?.email}
            {/* Button to change page delete later*/}
            <a href="/">
              <button type="button" style={{ background: "yellow" }}>
                Home
              </button>
            </a>
            {/* Button to change page delete later*/}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
