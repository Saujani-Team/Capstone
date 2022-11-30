import React from "react";
import { connect } from "react-redux";
import { fetchUser } from "../store/user";
import { Link } from "react-router-dom";

export class UserProfile extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.loadUser(this.props.match.params.userId);
  }
  render() {
    const user = this.props.user;
    console.log("this.props", this.props.user.drawings);
    const userId = user.id || 0;
    const firstName = user.firstName || "";
    const lastName = user.lastName || "";
    const username = user.username || "";
    const email = user.email;
    const drawings = user.drawings || [];

    return (
      <div className="container">
        <main>
          <h1>My Profile</h1>
          {user.length == 0 && (
            <h3 className=" error">User does not exist in the system!</h3>
          )}
          <h2>
            Name: {firstName} {lastName}
          </h2>
          <h4>Username: {username}</h4>

          <h4>Email: {email}</h4>

          <h4>My Drawings</h4>
          {drawings.map((drawing) => {
            return (
              <div key={drawing.id} className="list">
                <div key={drawing.id}>
                  <img width="300" height="250" src={drawing.imageUrl} />
                </div>
              </div>
            );
          })}

          {/* <div>
            <Link to={`/users/${userId}/editProfile`}>
              <button type="button">Edit User Profile</button>
            </Link>
          </div> */}
        </main>
      </div>
    );
  }
}

const mapState = (state) => {
  console.log("state in maapstate", state);
  return {
    user: state.user,
  };
};

const mapDispatch = (dispatch) => ({
  loadUser: (userId) => dispatch(fetchUser(userId)),
});

export default connect(mapState, mapDispatch)(UserProfile);