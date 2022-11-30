const { db } = require("./db");
const PORT = process.env.PORT || 8080;
const app = require("./app");
const seed = require("../script/seed");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
let io = new Server(server);

const init = async () => {
  try {
    if (process.env.SEED === "true") {
      await seed();
    } else {
      await db.sync();
    }

    //let connections = [];
    io.on("connection", (socket) => {
      //connections.push(socket);
      console.log(`New WS connection...${socket.id}`);

      socket.on("joinroom", function (data) {
        console.log("user joined room", data);
        socket.join(data.room);
      });

      socket.on("sendcanvas", (data) => {
        console.log("sendcanvas data", data);
        socket.to(data.room).emit("canvasData", data.image);
      });

      socket.on("disconnect", () => {
        console.log("user disconnected");
      });
    });
    // start listening (and create a 'server' object representing our server)
    server.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`));
  } catch (ex) {
    console.log(ex);
  }
};

init();
