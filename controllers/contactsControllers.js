const contactsService = require("../services/contactsServices.js");
const { HttpError, ctrlWrapper } = require("../helpers/index.js");

const getAllContacts = ctrlWrapper(async (req, res) => {
  const result = await contactsService.listContacts();
  res.status(200).json(result);
});

const getContactById = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.getContactById(id);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
});

const deleteContact = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.removeContact(id);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
});

const createContact = ctrlWrapper(async (req, res) => {
  const result = await contactsService.addContact(req.body);

  res.status(201).json(result);
});

const updateContact = ctrlWrapper(async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, "Body must have at least one field");
  }

  const { id } = req.params;
  const result = await contactsService.updateContactById(id, req.body);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
});

module.exports = {
  getAllContacts,
  getContactById,
  deleteContact,
  createContact,
  updateContact,
};
