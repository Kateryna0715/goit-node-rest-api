const { HttpError, ctrlWrapper } = require("../helpers");
const Contact = require("../models/contactModel.js");

const isExistContact = async (req, res, next) => {
  const { email } = req.body;
  const isExists = await Contact.exists({ email: email });

  if (isExists) {
    next(HttpError(400, `Contact with email: ${email} is already exist!`));
  }
};

module.exports = ctrlWrapper(isExistContact);
