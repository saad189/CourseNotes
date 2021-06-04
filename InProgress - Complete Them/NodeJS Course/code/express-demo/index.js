//Imports:

const express = require("express");
const coursePackage = require("./course");
const app = express();
const logger = require("./middleware/logger");
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");
const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const courses = require("./routes/courses");
const home = require("./routes/home");

// Configuration:

const PORT = process.env.PORT || 4200;
console.log("Application Name: ", config.get("name"));
console.log("Mail Server: ", config.get("mail.host"));
console.log("Password:", config.get("mail.password"));

// MiddleWare:

console.log("NODE_ENV:", process.env.NODE_ENV); // can be undefined
console.log("app_ENV:", app.get("env"));

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startupDebugger("Morgan Enabled....");
  dbDebugger("Dabtabase connected...");
}

app.set("view engine", "pug"); //Internal Loading
app.set("views", "./views"); // default templates in view folder

app.use(helmet());
app.use(express.json());
app.use(logger);
app.use(express.static("public"));

//Routes:
app.use("/api/courses", courses);
app.use("/", home);

//Listen:

app.listen(PORT, () => {
  console.log(`listening on Port: ${PORT}...`);
});
