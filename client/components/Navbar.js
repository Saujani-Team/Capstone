import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn, auth }) => (
  <div>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">
            <img src={"/DYFO.png"} height={45} />
          </Link>
          <Link className="black-link" to="/draw">
            <img src={"/Draw.png"} height={27} />
          </Link>
          <Link className="black-link" to={`/users/${auth.id}`}>
            <img src={"/My Profile.png"} height={34} />
          </Link>
          <a className="black-link" href="#" onClick={handleClick}>
            <img src={"/Logout.png"} height={32} />
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/home">
            <img src={"/DYFO.png"} height={45} />
          </Link>

          <Link to="/login">
            <img src={"/Login.png"} height={32} />
          </Link>
          <Link to="/signup">
            <img src={"/Sign Up.png"} height={33} />
          </Link>
          <Link to="/draw">
            <img src={"/Draw.png"} height={25} />
          </Link>
        </div>
      )}
    </nav>
    {/* <hr /> */}
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
