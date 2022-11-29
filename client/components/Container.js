import React from "react";
import Draw from "./Draw";

class Container extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      color: "#000000",
      size: "5",
      tool: "brush",
    };
  }

  changeColor(params) {
    this.setState({
      color: params.target.value,
      tool: "brush",
    });
  }

  changeSize(params) {
    this.setState({
      size: params.target.value,
      tool: "brush",
    });
  }

  erase() {
    this.setState({
      tool: "eraser",
    });
  }

  render() {
    return (
      <div className="container">
        <div className="tools-section">
          <div className="color-picker-container">
            Select Brush Color : &nbsp;
            <input
              type="color"
              value={this.state.color}
              onChange={this.changeColor.bind(this)}
            />
          </div>

          <div className="brushsize-container">
            Select Brush Size : &nbsp;
            <select
              value={this.state.size}
              onChange={this.changeSize.bind(this)}
            >
              <option> 5 </option>
              <option> 10 </option>
              <option> 15 </option>
              <option> 20 </option>
              <option> 25 </option>
              <option> 30 </option>
            </select>
          </div>

          <div className="eraser-container">
            Select Eraser Tool:
            <button type="button" onClick={this.erase.bind(this)}>
              Eraser
            </button>
          </div>
        </div>

        <div className="board-container">
          <Draw
            color={this.state.color}
            size={this.state.size}
            tool={this.state.tool}
          ></Draw>
        </div>
      </div>
    );
  }
}

export default Container;
