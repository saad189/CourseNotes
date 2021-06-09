const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const _ = require("lodash");
const mongoose = require("mongoose");
const isAuthorized = require("../middleware/auth");
const { User, validate } = require("../modals/User");

router.get("/", async (req, res) => {
  const users = await User.find().sort("name");
  res.send(users);
});

router.get("/me", isAuthorized, async (req, res) => {
  //isAuthorized will give req.user the user data
  let user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already exists!");

  user = new User(_.pick(req.body, ["name", "email", "password"]));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  user = await user.save();
  const token = user.generateAuthToken();
  user = _.pick(user, ["_id", "name", "email"]);

  res.header("x-auth-token", token).send(user);
});

module.exports = router;
