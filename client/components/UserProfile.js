import React from "react";
import io from "socket.io-client";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { fapaperplane } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { fetchUser } from "../store/user";
import { Link } from "react-router-dom";
import { deleteDrawing, createDrawing } from "../store/drawings";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// const socket = io.connect("https://draw-your-face-off.onrender.com");
const socket = io.connect("http://localhost:8080");

export class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.joinRoom.bind(this);
    this.getData.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    let rooms = [];
    let message = "";

    if (event.target.name === "allGroups") {
      rooms = this.props.user.drawings
        .filter((drawing) => drawing.group)
        .map((drawing) => `/draw/${drawing.uuid}`);
      message = this.state.allGroups;
    }
    rooms.map((room) => {
      socket.emit("sendMessage", { message, room });
    });
  }

  joinRoom(room) {
    socket.emit("leaderJoinRoom", {
      room: room,
    });
  }

  getData() {
    socket.on("canvasData", function (data) {
      let uuid = data.room.slice(6);
      window.localStorage.setItem(
        JSON.stringify(uuid),
        JSON.stringify(data.image)
      );
    });
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
          <img src="/My Profile.png" />
          {user.length == 0 && (
            <h3 className=" error">User does not exist in the system!</h3>
          )}
          <h2>
            <span className="fw-bold">Name: </span>{" "}
            <span className="fw-light">
              {firstName} {lastName}
            </span>
          </h2>
          <h4>
            {" "}
            <span className="fw-bold">Username: </span>
            <span className="fw-light">{username}</span>
          </h4>

          <h4>
            <span className="fw-bold">Email: </span>
            <span className="fw-light">{email}</span>
          </h4>

          <h2 className="mt-5">My Drawings</h2>
          <div className="container">
            <div className="row gx-5 text-center">
              {drawings
                .filter((drawing) => drawing.group === false)
                .map((drawing) => {
                  return (
                    <div key={drawing.id} className="col-auto">
                      <div className="row">
                        <div className="col">
                          <img
                            className="rounded"
                            width="300"
                            height="250"
                            src={drawing.imageUrl}
                          />
                        </div>
                      </div>
                      <div className="row gx-0">
                        <div className="col">
                          <Link to={`/draw/${drawing.uuid}`}>
                            <button
                              className="btn btn-light btn-sm mx-0"
                              type="button"
                            >
                              <i className="fa-solid fa-pen-to-square"></i>
                            </button>
                          </Link>
                        </div>

                        <div className="col">
                          <button
                            type="button"
                            className="btn btn-light btn-sm mx-0"
                            onClick={() => {
                              let link = document.createElement("a");
                              link.download = "my-drawing.png";
                              link.href = drawing.imageUrl;
                              link.click();
                            }}
                          >
                            <i className="fa-solid fa-download"></i>
                          </button>
                        </div>
                        <div className="col">
                          <button
                            type="button"
                            className="btn btn-light btn-sm mx-0"
                            onClick={async () => {
                              navigator.permissions
                                .query({ name: "clipboard-write" })
                                .then(async (result) => {
                                  if (
                                    result.state == "granted" ||
                                    result.state == "prompt"
                                  ) {
                                    try {
                                      const response = await fetch(
                                        drawing.imageUrl
                                      );
                                      let blob = await response.blob();
                                      blob = blob.slice(
                                        0,
                                        blob.size,
                                        "image/png"
                                      );
                                      await navigator.clipboard.write([
                                        new ClipboardItem({
                                          [blob.type]: blob,
                                        }),
                                      ]);
                                      window.alert(
                                        "Image copied to clipboard ✅"
                                      );
                                    } catch (err) {
                                      console.error(err.name, err.message);
                                    }
                                  }
                                });
                            }}
                          >
                            <i className="fa-regular fa-copy"></i>
                          </button>
                        </div>

                        <div className="col">
                          <button
                            type="button"
                            className="btn btn-light btn-sm mx-0"
                            onClick={() => {
                              this.props.deleteDrawing(drawing).then(() => {
                                this.props.loadUser(
                                  this.props.match.params.userId
                                );
                              });
                            }}
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          <div className="groups-container mt-5 mb-5">
            <h2>My Groups</h2>
            <button
              className="btn btn-light ms-0"
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
              .map((drawing, index) => {
                let room = `/draw/${drawing.uuid}`;
                this.joinRoom(room);
                this.getData(drawing.uuid);
                let currentImage = window.localStorage.getItem(
                  JSON.stringify(drawing.uuid)
                );

                return (
                  <div key={drawing.id}>
                    {index === 0 ? (
                      <div>
                        <Form
                          name="allGroups"
                          onSubmit={this.handleSubmit.bind(this)}
                        >
                          <Row className="mb-3">
                            <Form.Group as={Col} className="ms-0 me-0">
                              <Form.Control
                                type="text"
                                placeholder="Message all groups"
                                name="allGroups"
                                value={this.state.allGroups}
                                onChange={this.handleChange.bind(this)}
                                className="ms-0 me-0 pe-0"
                              />
                            </Form.Group>
                            <Col className="ms-0 ps-0">
                              <Button
                                // className="btn btn-light"
                                className="ms-0"
                                variant="light"
                                type="submit"
                                value="Submit"
                              >
                                <i className="fa-solid fa-paper-plane"></i>
                              </Button>
                            </Col>
                          </Row>
                        </Form>
                        <Row>
                          <Col className="ms-0 col-1">
                            <button
                              className="btn btn-light ms-0"
                              onClick={() => {
                                this.props.loadUser(
                                  this.props.match.params.userId
                                );
                              }}
                            >
                              <i className="fa-solid fa-arrows-rotate"></i>
                            </button>
                          </Col>
                          <Col>
                            <p>Refresh Group Images</p>
                          </Col>
                        </Row>
                      </div>
                    ) : null}
                    <h4>Group {index + 1}</h4>
                    <img
                      className="rounded"
                      width="300"
                      height="250"
                      src={JSON.parse(currentImage)}
                    />
                    <button
                      className="btn btn-light btn-sm"
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
                      <i class="fa-solid fa-link"></i>
                    </button>
                    <button
                      className="btn btn-light btn-sm"
                      type="button"
                      onClick={() => {
                        this.props.deleteDrawing(drawing).then(() => {
                          this.props.loadUser(this.props.match.params.userId);
                        });
                      }}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                );
              })}
          </div>
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
