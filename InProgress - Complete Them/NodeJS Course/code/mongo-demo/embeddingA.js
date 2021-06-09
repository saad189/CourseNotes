const mongoose = require("mongoose");
const Fawn = require("fawn");

const db = mongoose
  .connect("mongodb://localhost/playground", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log("Could not connect to DB", err));

Fawn.init(mongoose);
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
    authors: [authorSchema],
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

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors,
  });
  // new Fawn.Task.save('collectionName',Object).chainTasks().run()
  try {
    new Fawn.Task().save("courses", course).run();
  } catch (ex) {
    console.log(ex.error.message);
  }
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

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
}
//createAuthor("Saad", "My bio", "My Website");

// createCourse("Node Course", [
//   new Author({ name: "Saad" }),
//   new Author({ name: "John" }),
// ]);

createCourse("Fun Course", [new Author({ name: "Saad" })]);

// updateAuthor("60bf1cc46918d136b12c6f50");
listCourses();

//addAuthor("60bf202ec26cf03ac34cd5da", new Author({ name: "Amy" }));
