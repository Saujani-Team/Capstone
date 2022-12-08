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
  // paint() {
  //   this.setState({
  //     tool: "brush",
  //   });
  // }
  line() {
    this.setState({
      tool: "line",
    });
  }

  // rectangle() {
  //   this.setState({
  //     tool: "rectangle",
  //   });
  // }

  // circle() {
  //   this.setState({
  //     tool: "circle",
  //   });
  // }

  // star() {
  //   this.setState({
  //     tool: "star",
  //   });
  // }

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
            {/* <div className="btn-container">
              <button type="button" onClick={this.paint.bind(this)}>
                Paint
              </button>
            </div> */}
            <div className="btn-container">
              <button type="button" onClick={this.line.bind(this)}>
                Line
              </button>
            </div>
          </div>
          <div className="btn-container">
            <button type="button" onClick={this.erase.bind(this)}>
              Eraser
            </button>
          </div>
          <div className="btn-container">
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
