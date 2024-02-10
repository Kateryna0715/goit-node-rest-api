const { HttpError, ctrlWrapper } = require("../helpers");
const { Contact } = require("../models");

const isExistContact = async (req, res, next) => {
  const { email } = req.body;
  const isExists = await Contact.exists({ email });

  if (isExists) {
    next(HttpError(409, `Contact with email: ${email} is already exist!`));
  }
  next();
};

module.exports = ctrlWrapper(isExistContact);
