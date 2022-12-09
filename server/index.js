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
    let history = new Map();
    io.on("connection", (socket) => {
      connections.push(socket);
      console.log(`New WS connection...${socket.id}`);

      socket.on("joinroom", function (data, ack) {
        console.log(`${socket.id} joined ${data.room}`);
        socket.join(data.room);
        if (history.has(data.room))
          ack({
            history: history.get(data.room),
          });
        //send drawings history for specific room
        // might be able to to just sent the last element to save more time
        else ack({ history: [] });
      });

      socket.on("leaderJoinRoom", function (data) {
        console.log(`${socket.id} joined ${data.room}`);
        socket.join(data.room);
      });

      socket.on("sendcanvas", (data) => {
        //store drawings history
        let key = data.room;
        if (history.has(key)) {
          history.get(key).push(data.image);
        } else {
          history.set(key, [data.image]);
        }
        console.log("key", key);
        console.log("history", history.get(key).length);
        //send data to other connections
        connections.map((con) => {
          if (con.id !== socket.id) {
            socket.to(data.room).emit("canvasData", data);
          }
        });
      });

      socket.on("sendMessage", (data) => {
        socket.to(data.room).emit("receiveMessage", data);
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
