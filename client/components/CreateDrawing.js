import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createDrawing } from "../store/drawings";

class CreateDrawing extends React.Component {
  handleClick() {
    this.props.createDrawing();
  }

  render() {
    let liveDrawing = window.localStorage.getItem("liveDrawing");
    let uuid = window.localStorage.getItem("liveDrawingUUID");
    return (
      <div>
        <button onClick={this.handleClick.bind(this)}>Start Drawing ✏️</button>
        {liveDrawing ? (
          <div>
            <Link to={`/draw/${uuid}`} className="continue-drawing-container">
              <button className="drawing-btn">Continue Drawing 👉</button>
              <img width="300" height="250" src={liveDrawing} />
            </Link>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    createDrawing: () => dispatch(createDrawing()),
  };
};

export default connect(null, mapDispatch)(CreateDrawing);
