const mongoose = require("mongoose");
const db = mongoose
  .connect("mongodb://localhost/playground", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log("Could not connect to DB", err));

const Author = mongoose.model(
  "Author",
  new mongoose.Schema({
    name: String,
    bio: String,
    website: String,
  })
);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
    },
  })
);

async function createAuthor(name, bio, website) {
  const author = new Author({
    name,
    bio,
    website,
  });

  const result = await author.save();
  console.log(result);
}

async function createCourse(name, author) {
  const course = new Course({
    name,
    author,
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find()
    .populate("author", "name")
    .select("name author");
  console.log(courses);
}

async function updateAuthor(courseId) {
  const course = await Course.findById(courseId);
  course.author.name = "Saad Ahmed";
  course.save();
}
//createAuthor("Saad", "My bio", "My Website");

//createCourse("Fun Course", "60bf0d502851f42d2f8af926");

listCourses();
