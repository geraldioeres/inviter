import React, { useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import "./Navbar.css";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { SignedNav } from "./SignedNav";
import { UnsignedNav } from "./UnsignedNav";

function Navigation() {
  const [user, setUser] = useState({});

  const auth = getAuth();
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const logout = async () => {
    sessionStorage.removeItem('Auth Token');
    await signOut(auth);
  };

  let item = UnsignedNav;

  if (user) {
    item = SignedNav;
  }

  return (
    <div className="navigation">
      <Navbar bg="white" sticky="top">
        <Container>
          <Navbar.Brand href="/">
            <h1>INVITER</h1>
          </Navbar.Brand>
          <Nav className="ml-auto">
            {item.map((item, index) => {
              return (
                <Nav.Link
                  href={item.path}
                  key={index}
                  className={item.cName}
                  style={{ marginRight: "2rem", marginTop: "1px" }}
                >
                  {" "}
                  {item.title}
                </Nav.Link>
              );
            })}
            {user ? <Nav.Link href={`user/${user.uid}`}>{user.email}</Nav.Link> : ""}
            {user ? <button onClick={logout}>Log out</button> : ""}
            {/* <Nav.Link
              href="/"
              style={{ paddingRight: "2rem", paddingTop: "13px" }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              href="/login"
              style={{ paddingRight: "2rem", paddingTop: "13px" }}
            >
              Log In
            </Nav.Link>
            <Nav.Link href="/signup">
              <button className="sign-up-button">Sign Up</button>
            </Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navigation;
