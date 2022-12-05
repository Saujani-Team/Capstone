import React from "react";
import io from "socket.io-client";
import { connect } from "react-redux";
import { getDrawing, updateDrawing } from "../store/drawings";
// import styles from "../public/style.css";
import auth from "../store/auth";
import { fabric } from "fabric";

class DrawFabric extends React.Component {
  //   timeout;
  //   ctx;
  //   isDrawing = false;
  // socket = io.connect("https://draw-your-face-off.onrender.com");
  socket = io.connect("http://localhost:8080");

  constructor(props) {
    super(props);
    this.renderRect = this.renderRect.bind(this);
    this.canvas = new fabric.Canvas("canvas");
  }
  componentDidMount() {
    this.renderRect();
  }

  renderRect() {
    // create a rectangle object
    var rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: "red",
      width: 20,
      height: 20,
    });
    // "add" rectangle onto canvas
    this.canvas.add(rect);
  }
  render() {
    return (
      <div id="sketch">
        <button onClick={this.renderRect}>Rectangle</button>
        <canvas
          id="canvas"
          width={window.innerWidth}
          height={window.innerHeight}
        ></canvas>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    auth: state.auth,
    drawing: state.drawing,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getDrawing: (uuid) => dispatch(getDrawing(uuid)),
    updateDrawing: (drawing) => dispatch(updateDrawing(drawing)),
  };
};

export default connect(mapState, mapDispatch)(DrawFabric);
