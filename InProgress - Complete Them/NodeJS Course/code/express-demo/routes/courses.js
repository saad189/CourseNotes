const express = require("express");
const router = express.Router();
const isAuthorized = require("../middleware/auth");
const isAdmin = require("../middleware/admin");
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

router.get("/", (req, res) => {
  res.send(courses);
});

router.get("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("Course Not Found.");
  res.send(course);
});

router.post("/", (req, res) => {
  const { error } = coursePackage.validate(req.body);
  if (error) return res.status(400).send(result.error.details[0].message);

  const course = {
    id: courses.length,
    name: req.body.name,
  };
  courses.push(course);
  res.send(courses);
});

router.put("/:id", (req, res) => {
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

router.delete("/:id", [isAuthorized, isAdmin], (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.send(404).send("Course not found.");

  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

module.exports = router;
