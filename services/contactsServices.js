const Contact = require("../models/contactModel.js");

const listContacts = async () => {
  try {
    const data = await Contact.find();

    return data;
  } catch (error) {
    console.log(`Something went wrong! ${error.message}`.red);
  }
};

const getContactById = async (contactId) => {
  try {
    const contactById = Contact.findById(contactId);

    if (!contactById) {
      console.log(`Contact with id: ${contactId} doesn't exist`.red);
      return null;
    }

    return contactById;
  } catch (error) {
    console.log(`Something went wrong! ${error.message}`.red);
  }
};

const removeContact = async (contactId) => {
  try {
    const removedContact = Contact.findByIdAndDelete(contactId);

    return removedContact;
  } catch (error) {
    console.log(`Something went wrong! ${error.message}`.red);
  }
};

const addContact = async (data) => {
  try {
    const newContact = await Contact.create(data);

    return newContact;
  } catch (error) {
    console.log(`Something went wrong! ${error.message}`.red);
  }
};

const updateContactById = async (contactId, data) => {
  try {
    const updatedContact = Contact.findByIdAndUpdate(contactId, data, {
      new: true,
    });

    return updatedContact;
  } catch (error) {
    console.log(`Something went wrong! ${error.message}`.red);
  }
};

const updateStatus = async (contactId, status) => {
  try {
    const contact = await Contact.findById(contactId);
    contact.favorite = status;
    const updatedContact = await Contact.findByIdAndUpdate(contactId, contact, {
      new: true,
    });

    return updatedContact;
  } catch (error) {
    console.log(`Something went wrong! ${error.message}`.red);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
  updateStatus,
};
