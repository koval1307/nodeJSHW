const fs = require("fs");
const fsp = require("fs").promises;
const path = require("path");

const {
  listContacts,
  findContactById,
  removeContact,
  addContact,
  modifyContactById,
} = require("./contacts.model.js");

exports.createContact = async (req, res, next) => {
  try {
    const contact = await addContact(req.body);
    return res.status(201).send(contact);
  } catch (err) {
    next(err);
  }
};

exports.getContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    return res.status(200).send(contacts);
  } catch (err) {
    next(err);
  }
};

exports.getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await findContactById(contactId);
    if (!contact) {
      return res.status(404).send({ message: " not found" });
    }
    return res.status(200).send(contact);
  } catch (err) {
    next(err);
  }
};

exports.updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;
    if (!(name || email || phone)) {
      return res.status(400).send({ message: "missing required name field" });
    }
    const contact = await findContactById(contactId);
    if (!contact) {
      return res.status(404).send({ message: "Contact not found" });
    }
    const updatedContact = await modifyContactById(contactId, req.body);
    return res.status(200).send(updatedContact);
  } catch (err) {
    next(err);
  }
};

exports.removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await findContactById(contactId);
    if (!contact) {
      return res.status(404).send({ message: "Contact not found" });
    }
    removeContact(contactId);
    return res.status(200).send({ message: "Contact deleted" });
  } catch (err) {
    next(err);
  }
};

