import React from "react";
import { io } from "socket.io-client";

// var socket = io.connect("http://localhost:8080");

// if (process.env.NODE_ENV !== "development") {
//   socket = io.connect("https://draw-your-face-off.onrender.com");
// }

class Draw extends React.Component {
  timeout;
  ctx;
  isDrawing = false;
  socket = io.connect("https://draw-your-face-off.onrender.com");

  constructor(props) {
    super(props);
    this.socket.on("canvasData", function (data) {
      var root = this;
      var interval = setInterval(function () {
        if (root.isDrawing) return;
        root.isDrawing = true;
        clearInterval(interval);
        var image = new Image();
        var canvas = document.querySelector("#canvas");
        var ctx = canvas.getContext("2d");
        image.onload = function () {
          ctx.drawImage(image, 0, 0);

          root.isDrawing = false;
        };
        image.src = data;
      }, 200);
    });
  }

  componentDidMount() {
    this.drawOnCanvas();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.color !== this.props.color) {
      this.ctx.strokeStyle = this.props.color;
    }

    if (prevProps.size !== this.props.size) {
      this.ctx.lineWidth = this.props.size;
    }
  }
  drawOnCanvas() {
    var canvas = document.querySelector("#canvas");
    this.ctx = canvas.getContext("2d");
    var ctx = this.ctx;

    var sketch = document.querySelector("#sketch");
    var sketch_style = getComputedStyle(sketch);
    canvas.width = parseInt(sketch_style.getPropertyValue("width"));
    canvas.height = parseInt(sketch_style.getPropertyValue("height"));

    var mouse = { x: 0, y: 0 };
    var last_mouse = { x: 0, y: 0 };

    /* Mouse Capturing Work */
    canvas.addEventListener(
      "mousemove",
      function (e) {
        last_mouse.x = mouse.x;
        last_mouse.y = mouse.y;

        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
      },
      false
    );

    /* Drawing on Paint App */
    ctx.lineWidth = this.props.size;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.strokeStyle = this.props.color;

    canvas.addEventListener(
      "mousedown",
      function (e) {
        canvas.addEventListener("mousemove", onPaint, false);
      },
      false
    );

    canvas.addEventListener(
      "mouseup",
      function () {
        canvas.removeEventListener("mousemove", onPaint, false);
      },
      false
    );
    var root = this;
    var onPaint = function () {
      ctx.beginPath();
      ctx.moveTo(last_mouse.x, last_mouse.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.closePath();
      ctx.stroke();

      if (root.timeout != undefined) clearTimeout(root.timeout);

      root.timeout = setTimeout(function () {
        var base64ImageData = canvas.toDataURL("img/png");
        root.socket.emit("canvasData", base64ImageData);
      }, 1000);
    };
  }
  render() {
    return (
      <div id="sketch">
        <canvas id="canvas"></canvas>
      </div>
    );
  }
}

export default Draw;
