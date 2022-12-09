import React from "react";
import io from "socket.io-client";
import { connect } from "react-redux";
import { getDrawing, updateDrawing } from "../store/drawings";
import auth from "../store/auth";

class Draw extends React.Component {
  timeout;
  ctx;
  // socket = io.connect("https://draw-your-face-off.onrender.com");
  socket = io.connect("http://localhost:8080");

  //set up something to keep track of drawing steps
  //needed for undo and redo
  steps = [];

  constructor(props) {
    super(props);
    let s = this.steps;

    this.socket.on("canvasData", function (data) {
      var root = this;
      var interval = setInterval(function () {
        clearInterval(interval);
        var image = new Image();
        var canvas = document.querySelector("#canvas");
        var ctx = canvas.getContext("2d");
        image.onload = function () {
          ctx.drawImage(image, 0, 0);

          root.isDrawing = false;
          s.push(canvas.toDataURL());
        };
        image.src = data.image;
      }, 200);
    });

    this.socket.on("receiveMessage", function (data) {
      let messageElement = document.querySelector(".message");
      messageElement.innerHTML = data.message;
    });

    this.socket.emit(
      "joinroom",
      { room: window.location.pathname },
      //load drawings history
      function (ack) {
        var canvas = document.querySelector("#canvas");
        var ctx = canvas.getContext("2d");
        if (ack.history.length > 0) {
          var image = new Image();

          image.onload = function () {
            ctx.drawImage(image, 0, 0);

            while (s.length > 0) {
              s.pop();
            }
            s.push(canvas.toDataURL());
          };
          image.src = ack.history[ack.history.length - 1];
        }
      }
    );
  }

  componentDidMount() {
    this.draw();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.color !== this.props.color) {
      this.ctx.strokeStyle = this.props.color;
    }

    if (prevProps.size !== this.props.size) {
      this.ctx.lineWidth = this.props.size;
    }
    if (prevProps.tool !== this.props.tool) {
      //some custome cursors for every tool except for text and line
      if (prevProps.tool === "brush") {
        document.querySelector("#canvas").classList.remove("brush");
      }
      if (prevProps.tool === "eraser") {
        document.querySelector("#canvas").classList.remove("eraser");
      }
      if (
        prevProps.tool === "rectangle" ||
        prevProps.tool === "circle" ||
        prevProps.tool === "star"
      ) {
        document.querySelector("#canvas").classList.remove("rainbow");
      }
      if (this.props.tool === "eraser") {
        document.querySelector("#canvas").classList.add("eraser");
      }
      if (this.props.tool === "brush") {
        document.querySelector("#canvas").classList.add("brush");
      }
      if (
        this.props.tool === "rectangle" ||
        this.props.tool === "circle" ||
        this.props.tool === "star"
      ) {
        document.querySelector("#canvas").classList.add("rainbow");
      }
    }
    var canvas = document.querySelector("#canvas");
    var ctx = canvas.getContext("2d");

    let temp = new Image();
    temp.src = this.steps[this.steps.length - 1];
    temp.onload = function () {
      ctx.drawImage(temp, 0, 0);
    };
  }

  draw() {
    var canvas = document.querySelector("#canvas");
    this.ctx = canvas.getContext("2d");
    var ctx = this.ctx;

    //default cursor set to paint brush
    canvas.classList.add("brush");

    var hasInput = false;
    var inputFont = "14px sans-serif";
    var root = this;

    var sketch = document.querySelector("#sketch");
    var sketch_style = getComputedStyle(sketch);
    canvas.width = parseInt(sketch_style.getPropertyValue("width"));
    canvas.height = parseInt(sketch_style.getPropertyValue("height"));

    // set default background color of white
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    root.steps.push(canvas.toDataURL());

    window.addEventListener("resize", resizeCanvas, false);

    function resizeCanvas() {
      let canvas = document.querySelector("#canvas");
      let ctx = canvas.getContext("2d");
      if (ctx.getImageData(0, 0, canvas.width, canvas.height)) {
        //store current drawings if there is any
        let temp = ctx.getImageData(0, 0, canvas.width, canvas.height);
        //resize
        canvas.width = parseInt(sketch_style.getPropertyValue("width"));
        canvas.height = parseInt(sketch_style.getPropertyValue("height"));
        // set default background color of white
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        //put previous drawings back
        ctx.putImageData(temp, 0, 0);
      }

      ctx.lineWidth = root.props.size;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.strokeStyle = root.props.color;
    }

    resizeCanvas();

    initListeners();

    function initListeners() {
      let mouse = { x: 0, y: 0 };
      let last_mouse = { x: 0, y: 0 };
      let last_mouse2 = { x: 0, y: 0 }; //for drawing straight shapes
      let mousedown = false; //for drawing straight shapes

      //brush/line styles
      ctx.lineWidth = root.props.size;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.strokeStyle = root.props.color;

      /* Mouse Capturing Work */
      // mouse move
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
      //mouse down
      canvas.addEventListener(
        "mousedown",
        function (e) {
          e.preventDefault();
          canvas.addEventListener("mousemove", onPaint, false);
          last_mouse2.x = e.pageX - this.offsetLeft;
          last_mouse2.y = e.pageY - this.offsetTop;
          mousedown = true;
          canvas.classList.add("mouseDown");
        },

        false
      );
      //mouse up
      canvas.addEventListener(
        "mouseup",
        function () {
          drawShapes();
          canvas.removeEventListener("mousemove", onPaint, false);

          mousedown = false;
          root.steps.push(canvas.toDataURL());
          canvas.classList.remove("mouseDown");
        },
        false
      );
      // single click
      canvas.addEventListener("click", function (e) {
        e.preventDefault();
        if (hasInput) return;
        addText(e);
      });

      //draw shapes
      var drawShapes = function () {
        ctx.lineWidth = root.props.size;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.strokeStyle = root.props.color;

        if (root.props.tool === "line" && mousedown) {
          ctx.beginPath();
          ctx.moveTo(last_mouse2.x, last_mouse2.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }

        if (root.props.tool === "circle" && mousedown) {
          ctx.beginPath();
          let centerX = last_mouse2.x;
          let centerY = last_mouse2.y;
          let radius = Math.abs(mouse.x - last_mouse2.x) / 2;
          ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
          ctx.stroke();
        }

        if (root.props.tool === "rectangle" && mousedown) {
          ctx.beginPath();
          ctx.rect(
            last_mouse2.x,
            last_mouse2.y,
            Math.abs(mouse.x - last_mouse2.x),
            Math.abs(mouse.y - last_mouse2.y)
          );
          ctx.stroke();
        }

        if (root.props.tool === "star" && mousedown) {
          ctx.beginPath();
          let centerX = last_mouse2.x;
          let centerY = last_mouse2.y;
          let radius = Math.abs(mouse.x - last_mouse2.x) * 1.25;
          let N = 5;
          ctx.moveTo(centerX + radius, centerY);
          for (var i = 1; i <= N * 2; i++) {
            if (i % 2 == 0) {
              var theta = (i * (Math.PI * 2)) / (N * 2);
              var x = centerX + radius * Math.cos(theta);
              var y = centerY + radius * Math.sin(theta);
            } else {
              var theta = (i * (Math.PI * 2)) / (N * 2);
              var x = centerX + (radius / 2) * Math.cos(theta);
              var y = centerY + (radius / 2) * Math.sin(theta);
            }

            ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.stroke();
          ctx.fillStyle = ctx.strokeStyle;
          ctx.fill();
        }

        socketemit();
      };

      var onPaint = function () {
        ctx.lineWidth = root.props.size;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.strokeStyle = root.props.color;

        if (root.props.tool === "eraser") {
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
        ctx.fillStyle = root.props.color;
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
        // emit canvas data every half second
        if (root.timeout != undefined) clearTimeout(root.timeout);

        root.timeout = setTimeout(function () {
          var base64ImageData = canvas.toDataURL("img/png");

          root.socket.emit("sendcanvas", {
            image: base64ImageData,
            room: window.location.pathname,
          });
          window.localStorage.setItem("liveDrawing", base64ImageData);
          window.localStorage.setItem(
            "liveDrawingUUID",
            window.location.pathname.slice(6)
          );
        }, 500);
      }
      document.addEventListener("mousemove", drag);
      document.addEventListener("mouseup", stopDrag);
    }
  }

  save(evt) {
    let drawingUUID = window.location.pathname.slice(6);
    let imageDataUrl = canvas.toDataURL("img/png");
    this.props.getDrawing(drawingUUID).then(() => {
      let currentDrawing = {
        id: this.props.drawing.id,
        userId: this.props.auth.id,
        imageUrl: imageDataUrl,
        status: "saved",
      };
      this.props.updateDrawing(currentDrawing);
    });
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

  undo() {
    const temp = new Image();
    var canvas = document.querySelector("#canvas");
    var ctx = canvas.getContext("2d");
    //make sure the steps array is not going to empty after the pop
    if (this.steps.length > 1) {
      this.steps.pop();

      temp.src = this.steps[this.steps.length - 1];
      temp.onload = function () {
        ctx.drawImage(temp, 0, 0);
      };
      window.localStorage.setItem("liveDrawing", canvas.toDataURL());
    }

    // emit canvas data every half second
    if (this.timeout != undefined) clearTimeout(this.timeout);

    var socket = this.socket;
    this.timeout = setTimeout(function () {
      var base64ImageData = canvas.toDataURL("img/png");
      socket.emit("sendcanvas", {
        image: base64ImageData,
        room: window.location.pathname,
      });
    }, 500);
  }
  clear() {
    var canvas = document.querySelector("#canvas");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    while (this.steps.length > 0) {
      this.steps.pop();
    }
    this.steps.push(canvas.toDataURL());
    window.localStorage.setItem("liveDrawing", canvas.toDataURL());
    // emit canvas data every half second
    if (this.timeout != undefined) clearTimeout(this.timeout);

    var socket = this.socket;
    this.timeout = setTimeout(function () {
      var base64ImageData = canvas.toDataURL("img/png");
      socket.emit("sendcanvas", {
        image: base64ImageData,
        room: window.location.pathname,
      });
    }, 500);
  }
  render() {
    return (
      <div id="sketch">
        {this.props.isLoggedIn ? (
          <div className="save-container">
            <button type="button" onClick={this.save.bind(this)}>
              Save Drawing 🖼
            </button>
          </div>
        ) : null}
        <br></br>
        <div className="collaboration-link-container">
          <button type="button" onClick={this.getLink.bind(this)}>
            Generate Link 🖇️
          </button>
        </div>
        <br />
        <button type="button" onClick={this.undo.bind(this)}>
          Undo
        </button>
        &nbsp;&nbsp;&nbsp;
        <button type="button" onClick={this.clear.bind(this)}>
          Clear Canvas
        </button>
        <div className="message"></div>
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
    getDrawing: (uuid) => dispatch(getDrawing(uuid)),
    updateDrawing: (drawing) => dispatch(updateDrawing(drawing)),
  };
};

export default connect(mapState, mapDispatch)(Draw);
