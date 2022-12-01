import React from "react";
import io from "socket.io-client";
import { connect } from "react-redux";
import { getDrawing, updateDrawing } from "../store/drawings";
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
  }
  drawOnCanvas() {
    var canvas = document.querySelector("#canvas");
    this.ctx = canvas.getContext("2d");
    var ctx = this.ctx;
    var hasInput = false;
    var inputFont = "14px sans-serif";

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

    canvas.addEventListener("click", function (e) {
      if (hasInput) return;
      addText(e);
    });

    var root = this;
    var onPaint = function () {
      if (root.props.tool === "eraser") {
        // ctx.globalCompositeOperation = "destination-out";
        ctx.strokeStyle = "white";
      }

      if (root.props.tool === "brush" || root.props.tool === "eraser") {
        ctx.beginPath();
        ctx.moveTo(last_mouse.x, last_mouse.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.closePath();
        ctx.stroke();
      }
      socketemit();
    };

    // handler for input box
    function handleEnter(e) {
      var keyCode = e.keyCode;
      if (keyCode === 13) {
        drawText(
          this.value,
          parseInt(this.style.left, 10),
          parseInt(this.style.top, 10) - canvas.getBoundingClientRect().top
        );
        sketch.removeChild(this);
        hasInput = false;
      }
    }

    // draw the text onto canvas
    function drawText(txt, x, y) {
      ctx.textBaseline = "top";
      ctx.textAlign = "left";
      ctx.font = inputFont;
      ctx.fillText(txt, x - 4, y - 4);

      socketemit();
    }
    var addText = function (e) {
      if (root.props.tool !== "text") return;
      var input = document.createElement("input");
      input.type = "text";
      input.style.position = "fixed";
      input.style.top = e.clientY - 4 + "px";
      input.style.left = e.clientX - 4 + "px";
      input.onkeydown = handleEnter;
      sketch.appendChild(input);
      input.focus();
      hasInput = true;
    };

    function socketemit() {
      // emit canvas data every second
      if (root.timeout != undefined) clearTimeout(root.timeout);

      root.timeout = setTimeout(function () {
        var base64ImageData = canvas.toDataURL("img/png");
        //root.socket.emit("canvasData", base64ImageData);
        root.socket.emit("sendcanvas", {
          image: base64ImageData,
          room: window.location.pathname,
        });
      }, 1000);
    }
  }

  save() {
    let drawingId = parseInt(window.location.pathname.slice(6));
    this.props.getDrawing(drawingId);
    let imageDataUrl = canvas.toDataURL("img/png");
    let currentDrawing = {
      id: drawingId,
      userId: this.props.auth.id,
      imageUrl: imageDataUrl,
      status: "saved",
    };
    this.props.updateDrawing(currentDrawing);
  }

  getLink() {
    let link = window.location.href;
    navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
      if (result.state === "granted" || result.state === "prompt") {
        window.navigator.clipboard.writeText(link).then(() => {
          window.alert(`Invite link copied link to clipboard ✅: ${link}`);
        });
      }
    });
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
        <div className="collaboration-link-container">
          <button type="button" onClick={this.getLink.bind(this)}>
            Generate Link 🖇️
          </button>
        </div>
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
    getDrawing: (id) => dispatch(getDrawing(id)),
    updateDrawing: (drawing) => dispatch(updateDrawing(drawing)),
  };
};

export default connect(mapState, mapDispatch)(Draw);
