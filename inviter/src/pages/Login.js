import React, { useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase-config";

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
      console.log(user)
      sessionStorage.setItem('Auth Token', user._tokenResponse.refreshToken)
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <div className="login-container">
        <div className="login-form">
          <label className="login-label">
            Email Address
            <input
              type="email"
              className="login-input"
              placeholder="Email Address"
              onChange={(e) => setLoginEmail(e.target.value)}
            />
          </label>
        </div>
        <div className="login-form">
          <label className="login-label">
            Password
            <input
              type="text"
              className="login-input"
              placeholder="Password"
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </label>
        </div>
        <button onClick={login}>Log In</button>
      </div>
      <span className="login-signup">
        Don't have an account?{" "}
        <a href="/signup" className="signup-link">
          Sign Up Now!
        </a>
      </span>
      {user?.email}
      {/* Button to change page delete later*/}
      <a href="/">
        <button type="button" style={{ background: "yellow" }}>
          Home
        </button>
      </a>
      {/* Button to change page delete later*/}
    </div>
  );
}

export default Login;
