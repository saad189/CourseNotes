const express = require("express");
const coursePackage = require("./course");
const app = express();
const logger = require("./logger");
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");
const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");

// Configuration:
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

//Port:

const PORT = process.env.PORT || 4200;

//Data:
const courses = [
  {
    id: 0,
    name: "english",
  },
  {
    id: 1,
    name: "maths",
  },
  {
    id: 2,
    name: "science",
  },
];

//Routes:

app.get("/", (req, res) => {
  res.render("index", { title: "Saad Title", message: "Hello World" });
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("Course Not Found.");
  res.send(course);
});

app.get("/api/posts/:year/:month", (req, res) => {
  res.send({ params: req.params, query: req.query });
});

app.post("/api/courses", (req, res) => {
  const { error } = coursePackage.validate(req.body);
  if (error) return res.status(400).send(result.error.details[0].message);

  const course = {
    id: courses.length,
    name: req.body.name,
  };
  courses.push(course);
  res.send(courses);
});

app.put("/api/courses/:id", (req, res) => {
  // 1. Find Course
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("Course not found");

  // 2. Validate
  const { error } = coursePackage.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // 3. Update Course
  course.name = req.body.name;
  res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.send(404).send("Course not found.");

  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

//Listen:

app.listen(PORT, () => {
  console.log(`listening on Port: ${PORT}...`);
});
