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

    let connections = [];
    let history = [];
    io.on("connection", (socket) => {
      connections.push(socket);
      console.log(`New WS connection...${socket.id}`);

      socket.on("joinroom", function (data, ack) {
        console.log(`${socket.id} joined ${data.room}`);
        socket.join(data.room);
        ack({ history }); //send drawings history
      });

      socket.on("leaderJoinRoom", function (data) {
        console.log(`${socket.id} joined ${data.room}`);
        socket.join(data.room);
      });

      socket.on("sendcanvas", (data) => {
        //store drawings history
        history.push(data);
        //send data to other connections
        connections.map((con) => {
          if (con.id !== socket.id) {
            socket.to(data.room).emit("canvasData", data.image);
            console.log("sending cavas data");
          }
        });
      });

      socket.on("disconnect", () => {
        connections = connections.filter((con) => con.id !== socket.id);
        console.log(`user disconnected...${socket.id}`);
      });
    });
    // start listening (and create a 'server' object representing our server)
    server.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`));
  } catch (ex) {
    console.log(ex);
  }
};

init();
