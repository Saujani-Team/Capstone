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
  <Navbar expand="xl">
    {isLoggedIn ? (
      <Container>
        {/* The navbar will show these links after you log in */}
        <Navbar.Brand id="DYFO-logo" href="/home">
          <img src={"/DYFO Gradient3.png"} height={55} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav.Link className="black-link" href="/draw">
            <img className="font-draw" src={"/Draw.png"} height={23} />
          </Nav.Link>
          <Nav.Link className="black-link" href={`/users/${auth.id}`}>
            <img src={"/My Profile.png"} height={24} />
          </Nav.Link>
          <Nav.Link className="black-link" href={`/howto`}>
            <img className="font-howto" src={"/How To.png"} height={22} />
          </Nav.Link>
          <Nav.Link className="black-link" href="#" onClick={handleClick}>
            <img src={"/Logout.png"} height={24} />
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    ) : (
      <Container>
        {/* The navbar will show these links before you log in */}
        <Navbar.Brand id="DYFO-logo" href="/home">
          <img src={"/DYFO Gradient3.png"} height={60} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav.Link href="/login">
            <img src={"/Login.png"} height={24} />
          </Nav.Link>
          <Nav.Link href="/signup">
            <img src={"/Sign Up.png"} height={23} />
          </Nav.Link>
          <Nav.Link href="/draw">
            <img className="font-draw" src={"/Draw.png"} height={23} />
          </Nav.Link>
          <Nav.Link className="black-link" href={`/howto`}>
            <img className="font-howto" src={"/How To.png"} height={22} />
          </Nav.Link>
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
