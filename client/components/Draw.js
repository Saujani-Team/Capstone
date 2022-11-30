import React from "react";
import io from "socket.io-client";
import { connect } from "react-redux";
import { updateDrawing } from "../store/drawings";
import auth from "../store/auth";
class Draw extends React.Component {
  timeout;
  ctx;
  isDrawing = false;
  // socket = io.connect("https://draw-your-face-off.onrender.com");
  socket = io.connect("http://localhost:8080");

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
    this.socket.emit("joinroom", { room: window.location.pathname });
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
    console.log(this.props.tool);
  }
  drawOnCanvas() {
    var canvas = document.querySelector("#canvas");
    this.ctx = canvas.getContext("2d");
    var ctx = this.ctx;
    // var textarea = null;

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
        addText(e);
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
      if (root.props.tool === "eraser") {
        // ctx.globalCompositeOperation = "destination-out";
        ctx.strokeStyle = "white";
      }
      // else {
      //   ctx.globalCompositeOperation = "source-over";
      // }
      if (root.props.tool === "brush" || root.props.tool === "eraser") {
        ctx.beginPath();
        ctx.moveTo(last_mouse.x, last_mouse.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.closePath();
        ctx.stroke();
      }
      //the below still runs for all tools
      if (root.timeout != undefined) clearTimeout(root.timeout);

      root.timeout = setTimeout(function () {
        var base64ImageData = canvas.toDataURL("img/png");
        root.socket.emit("canvasData", base64ImageData);
        root.socket.emit("sendcanvas", {
          image: base64ImageData,
          room: window.location.pathname,
        });
      }, 1000);
    };

    function mouseDownOnTextarea(e) {
      var x = textarea.offsetLeft - e.clientX,
        y = textarea.offsetTop - e.clientY;
      function drag(e) {
        textarea.style.left = e.clientX + x + "px";
        textarea.style.top = e.clientY + y + "px";
      }
      function stopDrag() {
        document.removeEventListener("mousemove", drag);
        document.removeEventListener("mouseup", stopDrag);
      }
      document.addEventListener("mousemove", drag);
      document.addEventListener("mouseup", stopDrag);
    }

    function handleBlur() {
      console.log("handling blur");
      ctx.font = "20px Arial";
      ctx.beginPath();
      ctx.moveTo(last_mouse.x, last_mouse.y);
      ctx.fillText("Hello world", mouse.x, mouse.y);
      ctx.closePath();
    }

    var addText = function (e) {
      if (root.props.tool === "text") {
        //console.log(textarea);

        let textarea = document.createElement("textarea");
        textarea.className = "info";
        textarea.addEventListener("mousedown", mouseDownOnTextarea);
        document.body.appendChild(textarea);

        // var x = e.clientX - canvas.offsetLeft,
        //   y = e.clientY - canvas.offsetTop;
        textarea.value = "";
        textarea.style.top = e.clientY + "px";
        textarea.style.left = e.clientX + "px";
        textarea.focus();
        textarea.addEventListener("blur", handleBlur);
      }
    };
  }

  save() {
    let imageDataUrl = canvas.toDataURL("img/png");
    let currentDrawing = {
      id: this.props.drawing.id,
      userId: this.props.auth.id,
      imageUrl: imageDataUrl,
      status: "saved",
    };
    this.props.updateDrawing(currentDrawing);
  }

  render() {
    return (
      <div id="sketch">
        {this.props.isLoggedIn ? (
          <div className="save-container">
            <button type="button" onClick={this.save.bind(this)}>
              Save Drawing
            </button>
          </div>
        ) : null}
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
    updateDrawing: (drawing) => dispatch(updateDrawing(drawing)),
  };
};

export default connect(mapState, mapDispatch)(Draw);
