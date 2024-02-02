const express = require("express");
const { validateBody, isValidId, isExistContact } = require("../middlewares");
const {
  createContactSchema,
  updateContactSchema,
  updateStatus,
} = require("../schemas");
const ctrl = require("../controllers");

const contactsRouter = express.Router();

contactsRouter.get("/", ctrl.getAllContacts);

contactsRouter.get("/:id", isValidId, ctrl.getContactById);

contactsRouter.delete("/:id", isValidId, ctrl.deleteContact);

contactsRouter.post(
  "/",
  validateBody(createContactSchema),
  isExistContact,
  ctrl.createContact
);

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
