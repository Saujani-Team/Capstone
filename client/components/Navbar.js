import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn, auth }) => (
  <div>
    <h1>Draw Your Face Off</h1>
    <nav class="navbar fixed-bottom navbar-expand-sm navbar-dark bg-dark">
      <div class="container-fluid">
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <Link to="/draw">Draw</Link>
            <Link to={`/users/${auth.id}`}>My Profile</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/home">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/draw">Draw</Link>
          </div>
        )}
      </div>
    </nav>
    <hr />
  </div>
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

export default connect(mapState, mapDispatch)(Navbar);
