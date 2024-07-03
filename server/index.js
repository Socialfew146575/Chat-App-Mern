require("dotenv").config();

const PORT = process.env.PORT;

const express = require("express");
const app = express();
const http = require('http')
const connectToDb = require("./db/connect");
const cors = require("cors");
const server = http.createServer(app)
const socket = require("socket.io");

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const messageRoute = require("./routes/message");

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

const startServer = async () => {
  try {
    await connectToDb(process.env.MONGO_URI);
    server.listen(PORT, () => {
      console.log(`Server is listening at Port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

startServer();

const io = socket(server, {
  cors: {
    origin: [
      "https://chat-app-mern-server-psi.vercel.app/",
      "http://localhost:5173",
    ],
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;

  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", data.message);
    }
  });
});

