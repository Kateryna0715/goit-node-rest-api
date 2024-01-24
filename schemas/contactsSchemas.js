const Joi = require("joi");

const createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  //phone: Joi.number.pattern(new RegExp("^[0-9]{10}$")).required(),
});

const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
  // phone: Joi.string().pattern(new RegExp("^[0-9]{10}$")),
});

module.exports = {
  createContactSchema,
  updateContactSchema,
};
