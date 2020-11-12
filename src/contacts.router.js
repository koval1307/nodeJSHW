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
  validateIdSchema,
} = require("./contacts.schemes.js");

const router = Router();

router.post("/", validate(addContactSchema), createContact);

router.get("/", getContacts);

router.get("/:contactId",validate(validateIdSchema, "params"), getContactById);

router.patch(
  "/:contactId",
  validate(validateIdSchema, "params"),
  validate(updateContactSchema),
  updateContact
);

router.delete(
  "/:contactId",
  validate(validateIdSchema, "params"),
  removeContact
);

exports.contactsRouter = router;
