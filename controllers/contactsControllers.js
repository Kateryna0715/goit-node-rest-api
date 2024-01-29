const contactsService = require("../services/contactsServices.js");
const { HttpError, ctrlWrapper } = require("../helpers/index.js");

const getAllContacts = async (req, res) => {
  const result = await contactsService.listContacts();

  res.status(200).json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;

  const result = await contactsService.getContactById(id);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.removeContact(id);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
};

const createContact = async (req, res) => {
  const result = await contactsService.addContact(req.body);

  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, "Body must have at least one field");
  }

  const { id } = req.params;
  const result = await contactsService.updateContactById(id, req.body);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
};

const updateStatusContact = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, "You must input favorite status: true or false");
  }
  const { id } = req.params;
  const { favorite } = req.body;

  const updatedContact = await contactsService.updateStatus(id, favorite);
  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(updatedContact);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
