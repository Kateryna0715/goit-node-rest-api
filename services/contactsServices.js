const { nanoid } = require("nanoid");

const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "db", "contacts.json");
require("colors");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);

    return JSON.parse(data);
  } catch (error) {
    console.log(`Something went wrong! ${error.message}`.red);
  }
};

const getContactById = async (contactId) => {
  const data = await listContacts();
  const contactById = data.find((contact) => contact.id === contactId);
  if (!contactById) {
    console.log(`Contact with id: ${contactId} doesn't exist`.red);
    return null;
  }
  return contactById;
};

const removeContact = async (contactId) => {
  const data = await listContacts();
  const index = data.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    console.log(`ID: ${contactId} is not valid!`.red);
    return null;
  }

  const [removedContact] = data.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));

  return removedContact;
};

const addContact = async (name, email, phone) => {
  const data = await listContacts();

  const isExist = data.find((contact) => contact.email === email);

  if (isExist) {
    console.log("Contact with this email is already exist!".red);

    return null;
  }
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  data.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));

  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
