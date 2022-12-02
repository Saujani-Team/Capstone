import React from "react";
import Draw from "./Draw";

class Container extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      color: "#000000",
      size: "5",
      tool: "brush",
      shape: "line",
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
    });
  }

  changeShape(params) {
    this.setState({
      shape: params.target.value,
      tool: "shape",
    });
  }

  erase() {
    this.setState({
      tool: "eraser",
    });
  }

  text() {
    this.setState({
      tool: "text",
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
            Select Brush/Eraser Size : &nbsp;
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
          <div className="shape-container">
            Select a Shape:
            <select
              name="shape"
              id="shape"
              type="shape"
              value={this.state.shape}
              onChange={this.changeShape.bind(this)}
            >
              <option value="line">Line</option>
              <option value="rectangle">Rectangle</option>
              <option value="circle">Circle</option>
              <option value="triangle">Triangle</option>
            </select>
          </div>
          <div className="eraser-container">
            <button type="button" onClick={this.erase.bind(this)}>
              Eraser
            </button>
          </div>
          <div className="text-container">
            <button type="button" onClick={this.text.bind(this)}>
              Add Text
            </button>
          </div>
        </div>
        <div className="board-container">
          <Draw
            color={this.state.color}
            size={this.state.size}
            shape={this.state.shape}
            tool={this.state.tool}
          ></Draw>
        </div>
      </div>
    );
  }
}

export default Container;
