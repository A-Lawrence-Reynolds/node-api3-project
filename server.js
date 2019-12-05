const express = require("express");

const server = express();
server.use(express.json());

const postRouter = require("./posts/postRouter");
const usersRouter = require("./users/userRouter");

//custom middleware

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}]${req.method} to ${req.originalUrl}`
  );
  next();
}
server.use(logger);

server.use("/api/posts", postRouter);
server.use("/api/users", usersRouter);

module.exports = server;
