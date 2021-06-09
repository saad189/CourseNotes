const mongoose = require("mongoose");
const db = mongoose
  .connect("mongodb://localhost/playground", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log("Could not connect to DB", err));

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 255 },
  catagory: {
    type: String,
    enum: ["web", "mobile", "network"],
    required: true,
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      isAsync: true,
      validator: function (v, callback) {
        setTimeout(() => {
          const result = v?.length > 0;
          callback(result);
        }, 2000);
      },
      message: "A course should have atleast one tag.",
    },
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
    min: 0,
    max: 10000,
    get: (v) => Math.round(v),
    set: (v) => Math.round(v),
  },
});

const Course = mongoose.model("Course", courseSchema);

// camelCase -> Object

async function createCourse() {
  const course = new Course({
    name: "NetCore Course",
    author: "Mosh",
    tags: null,
    catagory: "-",
    isPublished: true,
    price: 100,
  });

  try {
    const result = await course.save();
    console.log(result);
  } catch (error) {
    for (field in error.errors) {
      console.log(error.errors[field].message);
    }
  }
}

createCourse();

async function getCourses() {
  const courses = await Course.find({
    isPublished: true,
  })
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 }); //1 == ascending, -1 == descending
  console.log(courses);
}

let author = {
  name: "Saad",
};
let course = {
  author: "id",
};
