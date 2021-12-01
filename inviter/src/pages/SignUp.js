import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import { gql, useMutation } from "@apollo/client";
import { Navigate } from "react-router-dom";
import "./Login.css";

const SIGNUP_USER = gql`
  mutation MyMutation($object: project_fe_users_insert_input = {}) {
    insert_project_fe_users_one(object: $object) {
      id
      uid
    }
  }
`;

function SignUp() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [signUpUser, { data, loading }] = useMutation(SIGNUP_USER, {
    notifyOnNetworkStatusChange: true,
  });

  const [user, setUser] = useState({});
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const signup = async (e) => {
    e.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      sessionStorage.setItem("Auth Token", user._tokenResponse.refreshToken);
      signUpUser({
        variables: {
          object: {
            uid: user?.user.uid,
            full_name: registerName,
            email: registerEmail,
          },
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="signup">
      <div
        className="container"
        style={{ maxWidth: "500px", padding: "0 20px", margin: "160px auto" }}
      >
        <div className="signup-wrapper">
          <h1 className="signup-title">Sign Up</h1>
          <div className="parent-link">
            <div className="signup-login">
              Already have an account?{" "}
              <a href="/login" className="login-link">
                Log in now!
              </a>
            </div>
          </div>
          <form className="form-container">
            <div className="signup-form">
              <label className="signup-label">Full Name</label>
              <input
                type="text"
                className="signup-input"
                placeholder="Full Name"
                onChange={(e) => setRegisterName(e.target.value)}
              />
            </div>
            <div className="signup-form">
              <label className="signup-label">Email Address</label>
              <input
                type="email"
                className="signup-input"
                placeholder="Email Address"
                onChange={(e) => setRegisterEmail(e.target.value)}
              />
            </div>
            <div className="signup-form">
              <label className="signup-label">Password</label>
              <input
                type="text"
                className="signup-input"
                placeholder="Password"
                onChange={(e) => setRegisterPassword(e.target.value)}
              />
            </div>
            <div className="signup-form">
              <button onClick={signup} className="signup-button">
                Sign Up
              </button>
            </div>
            {loading ? (
              <h1>Registering user...</h1>
            ) : data ? (
              <Navigate to="/" />
            ) : (
              ""
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
