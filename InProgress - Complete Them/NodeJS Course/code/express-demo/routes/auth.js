const express = require("express");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const router = express.Router();
const _ = require("lodash");
const mongoose = require("mongoose");
const { User } = require("../modals/User");

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(50).required().email(),
    password: Joi.string().min(8).max(255).required(),
  });
  return schema.validate(req);
}

router.get("/", async (req, res) => {
  const users = await User.find().sort("name");
  res.send(users);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");

  const isValidPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  console.log("is it valid:", isValidPassword);
  if (!isValidPassword)
    return res.status(400).send("Invalid email or password.");

  const token = user.generateAuthToken();

  res.header("x-auth-token", token).send(user);
});

module.exports = router;
