import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import { gql, useMutation } from "@apollo/client";
import { Navigate } from "react-router-dom";

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
      sessionStorage.setItem('Auth Token', user._tokenResponse.refreshToken)
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
    <div>
      <h1>Sign Up</h1>
      <span className="signup-login">
        Already have an account?{" "}
        <a href="/login" className="login-link">
          Log in now!
        </a>
      </span>
      <form>
        <div className="signup-form">
          <label className="signup-label">
            Full Name
            <input
              type="text"
              className="signup-input"
              placeholder="Full Name"
              onChange={(e) => setRegisterName(e.target.value)}
            />
          </label>
        </div>
        <div className="signup-form">
          <label className="signup-label">
            Email Address
            <input
              type="email"
              className="signup-input"
              placeholder="Email Address"
              onChange={(e) => setRegisterEmail(e.target.value)}
            />
          </label>
        </div>
        <div className="signup-form">
          <label className="signup-label">
            Password
            <input
              type="text"
              className="signup-input"
              placeholder="Password"
              onChange={(e) => setRegisterPassword(e.target.value)}
            />
          </label>
        </div>
        <button onClick={signup}>Sign Up</button>
      </form>
      {loading ? <h1>Registering user...</h1> : data ? <Navigate to="/" /> : ""}
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

export default SignUp;
