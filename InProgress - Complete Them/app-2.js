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
    freezeTableName: true, //Will ensure non-plural values (as the defintion)
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

// app.post("/post", (req, res) => {
//   const newUser = req.body.user;

//   User.create(newUser)
//     .then((user) => {
//       res.json(user);
//     })
//     .catch((error) => {
//       console.log(error);
//       res.status(404).send(error);
//     });
// });

app.put("/update", (req, res) => {
  User.update(
    {
      name: "Saad",
      password: "1234",
    },
    {
      where: { id: 1 },
    }
  )
    .then((rows) => {
      res.json(rows);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.delete("/remove", (req, res) => {
  User.destroy({
    where: {
      id: 2,
    },
  }).then(() => {
    res.send("user deleted");
  });
});
app.get("/findall", (req, res) => {
  User.findAll({
    where: {
      name: {
        [Op.like]: "F%",
      },
    },
  })
    .then((users) => {
      res.json(users);
      console.log("success");
    })
    .catch((error) => {
      console.log(error);
    });
});

connection
  .sync({
    //logging: console.log,
    // force: true, //Drop and Recreate table
  })
  .then(() => {
    // User.bulkCreate(_USERS)
    //   .then(() => {
    //     console.log("Successfully added bulk");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // Adding an entry
    // User.create({ name: "Saad", bio: "From this wierd Earth" });
  });

app.listen(PORT, () => {
  console.log("Running Server on Port " + PORT);
});
