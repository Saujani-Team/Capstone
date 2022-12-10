import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const TheNavbar = ({ handleClick, isLoggedIn, auth }) => (
  <Navbar expand="lg">
    {isLoggedIn ? (
      <Container>
        {/* The navbar will show these links after you log in */}
        <Navbar.Brand href="/home">
          <img src={"/DYFO.png"} height={45} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Link className="black-link" to="/draw">
            <img src={"/Draw.png"} height={27} />
          </Link>
          <Link className="black-link" to={`/users/${auth.id}`}>
            <img src={"/My Profile.png"} height={34} />
          </Link>
          <a className="black-link" href="#" onClick={handleClick}>
            <img src={"/Logout.png"} height={32} />
          </a>
        </Navbar.Collapse>
      </Container>
    ) : (
      <Container>
        {/* The navbar will show these links before you log in */}
        <Navbar.Brand href="/home">
          <img src={"/DYFO.png"} height={45} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/login">
              <img src={"/Login.png"} height={32} />
            </Link>
            <Link to="/signup">
              <img src={"/Sign Up.png"} height={33} />
            </Link>
            <Link to="/draw">
              <img src={"/Draw.png"} height={25} />
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    )}
    {/* <hr /> */}
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
