import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import "./Navbar.css";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { SignedNav } from "./SignedNav";
import { UnsignedNav } from "./UnsignedNav";
import Logo from "../assests/images/logo2.2.jpg";

function Navigation() {
  const [user, setUser] = useState({});

  const auth = getAuth();
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const logout = async () => {
    sessionStorage.removeItem("Auth Token");
    await signOut(auth);
  };

  let item = UnsignedNav;

  let authToken = sessionStorage.getItem("Auth Token");
  if (authToken) {
    item = SignedNav;
  }

  return (
    <div className="navigation">
      <Navbar bg="white" sticky="top">
        <Container>
          <Navbar.Brand href="/">
            <img src={Logo} alt="inviter-logo" className="logo" />
          </Navbar.Brand>
          <Nav className="ml-auto">
            {item.map((item, index) => {
              return (
                <Nav.Link
                  href={item.path}
                  key={index}
                  className={item.cName}
                  style={{
                    marginRight: "3rem",
                    marginTop: "1px",
                    fontSize: "16px",
                  }}
                >
                  {" "}
                  {item.title}
                </Nav.Link>
              );
            })}
            {user ? (
              <Nav.Link href={`user/${user.uid}`}>{user.email}</Nav.Link>
            ) : (
              ""
            )}
            {user ? <button onClick={logout}>Log out</button> : ""}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navigation;
