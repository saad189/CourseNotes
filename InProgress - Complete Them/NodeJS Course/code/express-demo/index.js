const express = require("express");
const coursePackage = require("./course");
const app = express(); //convention to store it in app

app.use(express.json()); // To enable json functionality
//# MiddleWare

const PORT = process.env.PORT || 4200;

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

app.get("/", (req, res) => {
  res.send("Hello World");
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

app.listen(PORT, () => {
  console.log(`listening on Port: ${PORT}...`);
});
