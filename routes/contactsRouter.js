const { Router } = require("express");
const {
  validateBody,
  isValidId,
  isExistContact,
  isUserAuthenticate,
} = require("../middlewares");
const { joiContactSchema } = require("../schemas");
const { ctrl } = require("../controllers");

const contactsRouter = Router();

contactsRouter.get("/", isUserAuthenticate, ctrl.getAllContacts);

contactsRouter.get("/:id", isUserAuthenticate, isValidId, ctrl.getContactById);

contactsRouter.delete(
  "/:id",
  isUserAuthenticate,
  isValidId,
  ctrl.deleteContact
);

contactsRouter.post(
  "/",
  validateBody(joiContactSchema.createContactSchema),
  isUserAuthenticate,
  isExistContact,
  ctrl.createContact
);

contactsRouter.put(
  "/:id",
  isUserAuthenticate,
  isValidId,
  validateBody(joiContactSchema.updateContactSchema),
  ctrl.updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  isUserAuthenticate,
  isValidId,
  validateBody(joiContactSchema.updateStatus),
  ctrl.updateStatusContact
);

module.exports = contactsRouter;
