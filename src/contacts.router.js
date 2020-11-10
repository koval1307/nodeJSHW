const { Router } = require("express");
const {
  createContact,
  getContacts,
  getContactById,
  updateContact,
  removeContact,
} = require("./contacts.controller.js");
const { validate } = require("./helpers/validate.Middleware");
const {
  addContactSchema,
  updateContactSchema,
} = require("./contacts.schemes.js");

const router = Router();

router.post("/", validate(addContactSchema), createContact);

router.get("/", getContacts);

router.get("/:contactId", getContactById);

router.patch("/:contactId", validate(updateContactSchema), updateContact);

router.delete("/:contactId", removeContact);

exports.contactsRouter = router;
