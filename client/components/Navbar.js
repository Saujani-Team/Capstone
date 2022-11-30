import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const TheNavbar = ({ handleClick, isLoggedIn, auth }) => (
  <Navbar bg="light" expand="lg">
    <Container>
      <Navbar.Brand>Draw Your Face Off</Navbar.Brand>
      <Nav className="me-auto">
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/draw">Draw</Nav.Link>
            <Nav.Link href={`/users/${auth.id}`}>My Profile</Nav.Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/signup">Sign Up</Nav.Link>
            <Nav.Link href="/draw">Draw</Nav.Link>
          </div>
        )}
      </Nav>
      <hr />
    </Container>
  </Navbar>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    auth: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(TheNavbar);
