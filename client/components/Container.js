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
    document.querySelector("#txt-btn").classList.remove("selected");
    this.setState({
      color: params.target.value,
    });
  }

  changeSize(params) {
    document.querySelector("#txt-btn").classList.remove("selected");
    this.setState({
      size: params.target.value,
    });
  }

  erase() {
    document.querySelector("#txt-btn").classList.remove("selected");
    this.setState({
      tool: "eraser",
    });
  }

  text() {
    document.querySelector("#txt-btn").classList.add("selected");
    this.setState({
      tool: "text",
    });
  }
  paint() {
    document.querySelector("#txt-btn").classList.remove("selected");
    this.setState({
      tool: "brush",
    });
  }

  line() {
    document.querySelector("#txt-btn").classList.remove("selected");
    this.setState({
      tool: "line",
    });
  }

  rectangle() {
    document.querySelector("#txt-btn").classList.remove("selected");
    this.setState({
      tool: "rectangle",
    });
  }

  circle() {
    document.querySelector("#txt-btn").classList.remove("selected");
    this.setState({
      tool: "circle",
    });
  }

  star() {
    document.querySelector("#txt-btn").classList.remove("selected");
    this.setState({
      tool: "star",
    });
  }

  render() {
    return (
      <div className="container">
        <div className="tools-section">
          <div className="color-picker-container">
            Color : &nbsp;
            <input
              type="color"
              value={this.state.color}
              onChange={this.changeColor.bind(this)}
            />
          </div>

          <div className="brushsize-container">
            Size : &nbsp;
            <input
              id="size"
              type="range"
              min="1"
              max="50"
              step="5"
              value={this.state.size}
              onChange={this.changeSize.bind(this)}
            ></input>
          </div>

          <div className="btn-container">
            <button
              type="button"
              className="button-2"
              autoFocus
              onClick={this.paint.bind(this)}
            >
              Paint
            </button>

            <button
              type="button"
              className="button-2"
              onClick={this.erase.bind(this)}
            >
              Eraser
            </button>

            <button
              type="button"
              className="button-2"
              id="txt-btn"
              onClick={this.text.bind(this)}
            >
              Add Text
            </button>
            <button
              type="button"
              className="button-2"
              onClick={this.line.bind(this)}
            >
              Line
            </button>

            <button
              type="button"
              className="button-2"
              onClick={this.circle.bind(this)}
            >
              Circle
            </button>
            <button
              type="button"
              className="button-2"
              onClick={this.rectangle.bind(this)}
            >
              Rectangle
            </button>

            <button
              type="button"
              className="button-2"
              onClick={this.star.bind(this)}
            >
              Star
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
