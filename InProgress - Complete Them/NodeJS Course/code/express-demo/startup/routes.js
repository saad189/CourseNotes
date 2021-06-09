const express = require("express");
const helmet = require("helmet");
const errorHandler = require("../middleware/errorhandler");

const courses = require("../routes/courses");
const home = require("../routes/home");
const users = require("../routes/users");
const auth = require("../routes/auth");

module.exports = function (app) {
  app.use(helmet());
  app.use(express.json());

  app.use(express.static("public"));
  app.set("view engine", "pug"); //Internal Loading
  app.set("views", "./views"); // default templates in view folder

  //Routes:
  app.use("/api/auth", auth);
  app.use("/api/courses", courses);
  app.use("/", home);
  app.use("/api/users", users);
  app.use(errorHandler);
};
