const express = require("express");
const { Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");
const app = express();
const PORT = 8001;

const Op = Sequelize.Op;
const _USERS = require("./users.json");

const connection = new Sequelize("db", "root", "12345678", {
  host: "localhost",
  dialect: "mysql",
  define: {
    freezeTableName: false, //Will ensure non-plural values (as the defintion)
  },
});

// Declaring a model
const User = connection.define(
  "User",
  {
    name: Sequelize.STRING,
    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: Sequelize.STRING,
      validate: {
        isAlphanumeric: true,
      },
    },
  },
  {
    hooks: {
      afterValidate: (user) => {
        user.password = bcrypt.hashSync(user.password, 8);
      },
    },
    timestamps: true, //make false, true by default
  }
); //3rd param

const Post = connection.define("Post", {
  title: Sequelize.STRING,
  content: Sequelize.TEXT,
});

const Comment = connection.define("Comment", {
  theComment: Sequelize.STRING,
});

const Project = connection.define("Project", {
  title: Sequelize.STRING,
});

app.get("/findProjects", (req, res) => {
  User.findAll({
    include: [{ model: Project, as: "Tasks", attributes: ["title"] }],
  })
    .then((output) => {
      res.json(output);
      console.log("success");
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send(error);
    });
});

app.get("/findall", (req, res) => {
  Post.findAll({
    include: [
      {
        model: User,
        as: "CockRoach",
      },
      {
        model: Comment,
        as: "AllComments",
      },
    ],
  })
    .then((posts) => {
      res.json(posts);
      console.log("success");
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send(error);
    });
});

Post.belongsTo(User, { as: "CockRoach", foreignKey: "uId" }); // puts foreign key UserId in Post table
Post.hasMany(Comment, { as: "AllComments" });
User.belongsToMany(Project, { as: "Tasks", through: "UserProjects" });
Project.belongsToMany(User, { as: "Workers", through: "UserProjects" });

connection
  .sync({
    //logging: console.log,
    force: true, //Drop and Recreate table
  })
  .then(() => {
    User.bulkCreate(_USERS)
      .then(() => {
        console.log("Successfully added bulk");
      })
      .catch((error) => {
        console.log(error);
      });
    Post.create({
      uId: 1,
      title: "First Post",
      content: "post content 1",
    });
    Comment.create({
      PostId: 1,
      theComment: "Hello",
    });
    Comment.create({
      PostId: 1,
      theComment: "BYE",
    });
    Comment.create({
      PostId: 1,
      theComment: "TRY",
    });
    Comment.create({
      PostId: 1,
      theComment: "CRY",
    });

    Project.create({
      title: "P-1",
    }).then((project) => {
      project.setWorkers([1, 2]);
    });
    Project.create({
      title: "P2",
    }).then((project) => {
      project.setWorkers([3, 4]);
    });
  });

app.listen(PORT, () => {
  console.log("Running Server on Port " + PORT);
});
