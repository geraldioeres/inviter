import React, { useState } from "react";
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
    await signOut(auth).then(window.location.reload());
  };

  let item = UnsignedNav;

  let authToken = sessionStorage.getItem("Auth Token");
  if (authToken) {
    item = SignedNav;
  }

  return (
    <div className="navigation">
      <Navbar collapseOnSelect expand="lg" bg="white shadow-sm" sticky="top">
        <Container>
          <Navbar.Brand href="/">
            <img src={Logo} alt="inviter-logo" className="logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Nav className="ml-auto">
            <Navbar.Collapse id="responsive-navbar-nav">
              {item.map((item, index) => {
                return (
                  <Nav.Link
                    href={item.path}
                    key={index}
                    className={item.cName}
                    style={{
                      marginRight: "2.5rem",
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
                <Nav.Link href={`user/${user.uid}`} className="user-profile">
                  {user.email}
                </Nav.Link>
              ) : (
                ""
              )}
              {user ? (
                <div onClick={logout} className="log-out">
                  Log out
                </div>
              ) : (
                ""
              )}
            </Navbar.Collapse>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navigation;
