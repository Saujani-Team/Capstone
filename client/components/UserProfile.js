import React from "react";
import io from "socket.io-client";
import { connect } from "react-redux";
import { fetchUser } from "../store/user";
import { Link } from "react-router-dom";
import { deleteDrawing, createDrawing } from "../store/drawings";

export class UserProfile extends React.Component {
  // socket = io.connect("https://draw-your-face-off.onrender.com");
  socket = io.connect("http://localhost:8080");

  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.loadUser(this.props.match.params.userId);
  }

  render() {
    const user = this.props.user;
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
          {drawings
            .filter((drawing) => drawing.group === false)
            .map((drawing) => {
              return (
                <div key={drawing.id} className="list">
                  <div key={drawing.id}>
                    <Link to={`/draw/${drawing.uuid}`}>
                      <img width="300" height="250" src={drawing.imageUrl} />
                      <button type="button">Edit</button>
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        let link = document.createElement("a");
                        link.download = "my-drawing.png";
                        link.href = drawing.imageUrl;
                        link.click();
                      }}
                    >
                      Download
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        navigator.permissions
                          .query({ name: "clipboard-write" })
                          .then(async (result) => {
                            if (
                              result.state == "granted" ||
                              result.state == "prompt"
                            ) {
                              try {
                                const response = await fetch(drawing.imageUrl);
                                let blob = await response.blob();
                                blob = blob.slice(0, blob.size, "image/png");
                                await navigator.clipboard.write([
                                  new ClipboardItem({
                                    [blob.type]: blob,
                                  }),
                                ]);
                                window.alert("Image copied to clipboard ✅");
                              } catch (err) {
                                console.error(err.name, err.message);
                              }
                            }
                          });
                      }}
                    >
                      Copy
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        this.props.deleteDrawing(drawing).then(() => {
                          this.props.loadUser(this.props.match.params.userId);
                        });
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          <div className="groups-container">
            <h4>My Groups</h4>
            <button
              onClick={() => {
                this.props
                  .createGroup({
                    userId: this.props.user.id,
                    group: true,
                  })
                  .then(() => {
                    this.props.loadUser(this.props.match.params.userId);
                  });
              }}
            >
              Create New Group
            </button>
            {drawings
              .filter((drawing) => drawing.group)
              .map((drawing) => {
                this.socket.emit("leaderJoinRoom", {
                  room: `/draw/${drawing.uuid}`,
                });
                this.socket.on("canvasData", function (data) {
                  console.log("THIS IS THE DATA!", data);
                  this.setState({ data });
                  console.log("this is state", this.state);
                });
                return (
                  <div key={drawing.id}>
                    <img width="300" height="250" src="" />
                    <button
                      onClick={async () => {
                        navigator.permissions
                          .query({ name: "clipboard-write" })
                          .then(async (result) => {
                            if (
                              result.state == "granted" ||
                              result.state == "prompt"
                            ) {
                              try {
                                let link = `${window.location.origin}/draw/${drawing.uuid}`;
                                await navigator.clipboard.writeText(link);
                                window.alert(
                                  `Link copied to clipboard ✅ Link: ${link}`
                                );
                              } catch (err) {
                                console.error(err.name, err.message);
                              }
                            }
                          });
                      }}
                    >
                      Copy Link
                    </button>
                  </div>
                );
              })}
          </div>
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
  return {
    user: state.user,
  };
};

const mapDispatch = (dispatch) => ({
  loadUser: (userId) => dispatch(fetchUser(userId)),
  deleteDrawing: (drawing) => dispatch(deleteDrawing(drawing)),
  createGroup: (params) => dispatch(createDrawing(params)),
});

export default connect(mapState, mapDispatch)(UserProfile);
