const http = require("http");
const { Server } = require("socket.io");
const app = require("./app");
const Message = require("./models/Message");
const { WEBSOCKET_EVENTS } = require("./constants");

const port = process.env.PORT || 3000;
const server = http.createServer(app);

const io = new Server(server, {
  transports: ["websocket"],
  cors: {
    origin: "https://localhost:5000",
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on(WEBSOCKET_EVENTS.NEW_MESSAGE, async (newMessage) => {
    try {
      const savedMessage = await Message.create(newMessage);
      io.emit(WEBSOCKET_EVENTS.NEW_MESSAGE, savedMessage);
    } catch (error) {
      socket.emit(WEBSOCKET_EVENTS.ERR_MESSAGE, error);
    }
  });
  socket.on("disconnect", (reason) => {
    console.log(reason);
  });
});

server.listen(port, () => {
  console.log("server started at port ", port);
});
