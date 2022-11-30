import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createDrawing } from "../store/drawings";

class CreateDrawing extends React.Component {
  handleClick() {
    this.props.createDrawing();
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick.bind(this)}>Start Drawing ✏️</button>
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
