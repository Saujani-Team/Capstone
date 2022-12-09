import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleLogin, handleSignup, error } = props;

  if (name === "login") {
    return (
      <div>
        <Form onSubmit={handleLogin} name="login">
          <div>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="username"
                type="text"
                placeholder="Enter Username"
              />
            </Form.Group>
          </div>
          <div>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
              />
            </Form.Group>
          </div>
          <div>
            <Button variant="secondary" type="submit">
              {displayName}
            </Button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </Form>
      </div>
    );
  } else {
    return (
      <div>
        <Form onSubmit={handleSignup} name="signup">
          <div>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="username"
                type="text"
                placeholder="Enter Username"
              />
            </Form.Group>
          </div>
          <div>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
              />
            </Form.Group>
          </div>
          <div>
            <div>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                />
              </Form.Group>
              {/* <label>
                <small>First Name</small>
              </label>
              <input name="firstName" type="text" defaultValue="" /> */}
            </div>
            <div>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                />
              </Form.Group>
              {/* <label>
                <small>Last Name</small>
              </label>
              <input name="lastName" type="text" defaultValue="" /> */}
            </div>
            <div>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Enter email"
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
            </div>
          </div>
          <div>
            <Button variant="secondary" type="submit">
              {displayName}
            </Button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </Form>
      </div>
    );
  }
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSignup(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      const firstName = evt.target.firstName.value;
      const lastName = evt.target.lastName.value;
      const email = evt.target.email.value;
      dispatch(
        authenticate(username, password, formName, firstName, lastName, email)
      );
    },
    handleLogin(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      dispatch(authenticate(username, password, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
