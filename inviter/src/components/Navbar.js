import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import "./Navbar.css";

function Navigation() {
  return (
    <div className="navigation">
      <Navbar bg="white" sticky="top">
        <Container>
          <Navbar.Brand href="/">
            <h1>INVITER</h1>
          </Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="/" style={{paddingRight: "2rem", paddingTop: "13px"}}>Home</Nav.Link>
            <Nav.Link href="/login" style={{paddingRight: "2rem", paddingTop: "13px"}}>Login</Nav.Link>
            <Nav.Link href="/signup">
              <button className="sign-up-button">Sign Up</button>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navigation;
