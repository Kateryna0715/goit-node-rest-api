const Joi = require("joi");

const createContactSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean().default(false),
});

const updateContactSchema = Joi.object({
  name: Joi.string().min(3),
  email: Joi.string().email(),
  phone: Joi.string(),
  favorite: Joi.boolean().default(false),
});

const updateStatus = Joi.object({
  favorite: Joi.boolean().required(),
});

const joiContactSchema = {
  createContactSchema,
  updateContactSchema,
  updateStatus,
};

module.exports = joiContactSchema;
