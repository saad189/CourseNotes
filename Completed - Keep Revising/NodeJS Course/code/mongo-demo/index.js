const mongoose = require("mongoose");
const db = mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log("Could not connect to DB", err));
// String for the environment
// Will automatically create the mentioned db

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

// Schema to Model
// (collection, document)
// Pascal Case -> Class
const Course = mongoose.model("Course", courseSchema);

// camelCase -> Object

async function createCourse() {
  const course = new Course({
    name: "Angular Course",
    author: "Mosh",
    tags: ["angular", "frontend"],
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
}

// createCourse();

async function getCourses() {
  const courses = await Course.find({
    isPublished: true,
  })
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 }); //1 == ascending, -1 == descending
  console.log(courses);
}

// getCourses();

async function getComparisonQueriedCourses() {
  const course = await Course.find({
    price: { $in: [10, 15, 20] },
  });
}

async function getLogicQueriedCourses() {
  const course = await Course.find()
    .or([{ author: "/^Mos/" }, { isPublished: true }])
    .select({ name: 1 });
  console.log(course);
}

// getLogicQueriedCourses();

async function getCount() {
  const count = await Course.find().count();
  console.log(count);
}

// getCount();

async function getPaginatedCourses() {
  const pageNumber = 2;
  const pageSize = 10;

  //api/courses?pageNumber=2&pageSize=10

  const courses = await Course.find()
    .skip((pageNumber - 1) * pageSize)
    .limit(pazeSize); //Assuming page starts from 1
}

// getPaginatedCourses();

async function updateCourse(id) {
  // Approach : Query first
  // findById()
  // Modify its properties
  // save()
  // ------------
  // Approach: Update first
  // Update directly
  // Optionally: get the updated document

  const course = await Course.findById(id);
  if (!course) return;

  course.isPublished = true;
  course.author = "Saad";

  //or use set, update only the required values to be changed

  course.set({
    isPublished: true,
    author: "Saad",
  });

  const result = await course.save();
  console.log(result);
}

// updateCourse("60bdb5e9ad1f1f39872075d4");

async function updateFirstCourse(id) {
  const result = await Course.findByIdAndUpdate(
    {
      _id: id,
    },
    {
      $set: {
        author: "Mosh",
        isPublished: false,
      },
    },
    { new: true }
  ); // { new : true } to get updated document
  console.log(result);
}

//updateFirstCourse("60bdb5e9ad1f1f39872075d4");

async function removeCourse(id) {
  const result = await Course.deleteOne({
    _id: id,
  });
  const course = await Course.findByIdAndRemove(id);
  console.log(result, course);
}

// removeCourse("60bdb5e9ad1f1f39872075d4");
