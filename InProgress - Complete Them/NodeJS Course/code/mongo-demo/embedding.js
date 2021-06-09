const mongoose = require("mongoose");
const db = mongoose
  .connect("mongodb://localhost/playground", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log("Could not connect to DB", err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    author: { type: authorSchema, required: true },
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
  const courses = await Course.find();
  console.log(courses);
}
async function updateAuthor(courseId) {
  const course = await Course.updateOne(
    { _id: courseId },
    {
      $set: {
        "author.name": "Fahad Nasir",
      },
    }
  );
  course.author.name = "Saad Ahmed";
  course.save();
}

//createAuthor("Saad", "My bio", "My Website");

// createCourse("Node Course", new Author({ name: "Saad" }));

updateAuthor("60bf1cc46918d136b12c6f50");
listCourses();
