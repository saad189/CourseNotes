const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");
const _ = require("lodash");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true, minlength: 8, maxlength: 1024 },
  isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    _.pick(this, ["_id", "email", "name", "isAdmin"]),
    config.get("jwtPrivateKey")
  );
};
const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(50).required().email(),
    password: Joi.string().min(8).max(255).required(),
  });
  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
