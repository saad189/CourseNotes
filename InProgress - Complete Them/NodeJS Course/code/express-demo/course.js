const Joi = require("joi");

function validate(course) {
  const schema = Joi.object({ name: Joi.string().min(3).required() });
  return schema.validate(course);
}

module.exports.validate = validate;
