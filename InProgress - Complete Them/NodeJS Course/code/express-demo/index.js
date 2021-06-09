//Imports:

const express = require("express");
const mongoose = require("mongoose");
const db = mongoose
  .connect("mongodb://localhost/playground", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log("Could not connect to DB", err));
const app = express();
const logger = require("./middleware/logger");
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");
const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");

const courses = require("./routes/courses");
const home = require("./routes/home");
const users = require("./routes/users");
const auth = require("./routes/auth");

// Configuration:

const PORT = process.env.PORT || 4200;
console.log("Application Name: ", config.get("name"));
console.log("Mail Server: ", config.get("mail.host"));
console.log("Password:", config.get("mail.password"));
if (!config.get("jwtPrivateKey")) {
  console.log(
    "FATAL ERROR: jwtPrivateKey is not defined",
    process.env.app_key,
    app.get("app_key")
  );
  process.exit(1); //Exit incase of an error
}
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
app.use("/api/auth", auth);
app.use("/api/courses", courses);
app.use("/", home);
app.use("/api/users", users);

//Listen:

app.listen(PORT, () => {
  console.log(`listening on Port: ${PORT}...`);
});
