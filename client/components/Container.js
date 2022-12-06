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

  line() {
    this.setState({
      tool: "line",
    });
  }

  rectangle() {
    this.setState({
      tool: "rectangle",
    });
  }

  circle() {
    this.setState({
      tool: "circle",
    });
  }

  star() {
    this.setState({
      tool: "star",
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
            <input
              id="size"
              type="range"
              min="1"
              max="30"
              step="1"
              value={this.state.size}
              onChange={this.changeSize.bind(this)}
            ></input>
            {/* <select
              value={this.state.size}
              onChange={this.changeSize.bind(this)}
            >
              <option> 5 </option>
              <option> 10 </option>
              <option> 15 </option>
              <option> 20 </option>
              <option> 25 </option>
              <option> 30 </option>
            </select> */}
          </div>
          <div className="shape-container">
            Select a Shape:
            <select name="shape" id="shape">
              <option value="line">Line</option>
              <option value="rectangle">Rectangle</option>
              <option value="circle">Circle</option>
              <option value="star">Star</option>
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
            tool={this.state.tool}
          ></Draw>
        </div>
      </div>
    );
  }
}

export default Container;
