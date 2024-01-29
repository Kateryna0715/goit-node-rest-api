const express = require("express");
const { validateBody, isValidId } = require("../middlewares");
const {
  createContactSchema,
  updateContactSchema,
  updateStatus,
} = require("../schemas/contactsSchemas.js");
const ctrl = require("../controllers/contactsControllers.js");

const contactsRouter = express.Router();

contactsRouter.get("/", ctrl.getAllContacts);

contactsRouter.get("/:id", isValidId, ctrl.getContactById);

contactsRouter.delete("/:id", isValidId, ctrl.deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), ctrl.createContact);

contactsRouter.put(
  "/:id",
  isValidId,
  validateBody(updateContactSchema),
  ctrl.updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  validateBody(updateStatus),
  ctrl.updateStatusContact
);

module.exports = contactsRouter;
