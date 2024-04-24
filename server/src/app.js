const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const createError = require("http-errors");
const xssClean = require("xss-clean");
const rateLimit = require("express-rate-limit");

const { errorResponse } = require("./controllers/responseController");
const userRouter = require("./routers/userRoute");
const chatRouter = require("./routers/chatRouter");
const messageRouter = require("./routers/messageRouter");
const authRouter = require("./routers/authRouter");
const postRouter = require("./routers/postRouter");
const seedRouter = require("./routers/seedRouter");

// socket io start ---***
const io = require("socket.io")(8800, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let activeUsers = [];

io.on("connection", (socket) => {
  // add new User
  socket.on("new-user-add", (newUserId) => {
    // if user is not added previously
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({ userId: newUserId, socketId: socket.id });
      console.log("New User Connected", activeUsers);
    }
    // send all active users to new user
    io.emit("get-users", activeUsers);
  });

  socket.on("disconnect", () => {
    // remove user from active users
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    console.log("User Disconnected", activeUsers);
    // send all active users to all users
    io.emit("get-users", activeUsers);
  });

  // send message to a specific user
  socket.on("send-message", (data) => {
    const { receiverId } = data;
    const user = activeUsers.find((user) => user.userId === receiverId);
    console.log("Sending from socket to :", receiverId);
    console.log("Data: ", data);
    if (user) {
      io.to(user.socketId).emit("recieve-message", data);
    }
  });
});
// socket io end ---***
//
//
// express app
const app = express();
//
//
// Requiest limiter module
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 100, // Limit each IP to 100 requests per `window`
  message: "Too many requests from this IP, please try again later",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
//
//
// Midlewares
app.use(cookieParser());
app.use(cors());
app.use(limiter);
app.use(xssClean());
app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
//
//
// use all route
app.use("/api/seed", seedRouter);

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

app.use("/api/posts", postRouter);

app.use("/api/chat", chatRouter);
app.use("/api/messages", messageRouter);
//
//
// client error handle
app.use((req, res, next) => {
  next(createError(404, "Route not found"));
});
//
//
// server error handle --> handle all error
app.use((err, req, res, next) => {
  return errorResponse(res, {
    statusCode: err.status,
    message: err.message,
  });
});
//
//
//
module.exports = app;
