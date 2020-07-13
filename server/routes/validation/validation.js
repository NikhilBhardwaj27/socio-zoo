const Joi = require("@hapi/joi");

const registerValidation = (data) => {
  const Schema = {
    username: Joi.string().min(3).required(),

    email: Joi.string().min(6).required().email(),

    password: Joi.string().min(6).required(),
  };
  return Joi.validate(data, Schema);
};

const loginValidation = (data) => {
  const Schema = {
    email: Joi.string().min(6).required().email(),

    password: Joi.string().min(6).required(),
  };
  return Joi.validate(data, Schema);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
