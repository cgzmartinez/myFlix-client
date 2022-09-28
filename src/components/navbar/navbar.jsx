import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import Logo from '/public/logo.png'
import { Link } from "react-router-dom";

export function Menubar({ user, onLoggedOut }) {

  const handleLogOut = (e) => {
    e.preventDefault();
    localStorage.clear();
    window.open('/', '_self');
    onLoggedOut(user);
  };

  const isAuth = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token")
    } else {
      return false;
    }
  };

  return (
    <Navbar className="main-nav" sticky="top" bg="light"
      expand="lg" variant="light">
      <Container>
        <Link to="/">
          <img src={Logo} height={65} />
        </Link>
        <Navbar.Brand className="navbar-logo" href="/">CINEMA SPARK</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            {isAuth() && (
              <Nav.Link href={`/users/${user}`}>{user}</Nav.Link>
            )}
            {isAuth() && (
              <Button variant="link" onClick={handleLogOut}>Logout</Button>
            )}
            {!isAuth() && (
              <Nav.Link href="/">Log In</Nav.Link>
            )}
            {!isAuth() && (
              <Nav.Link href="/register">Sign Up</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menubar