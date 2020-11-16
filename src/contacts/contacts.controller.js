
const { ContactModel } = require("./contacts.model.js");

exports.createContact = async (req, res, next) => {
  try {
    const newContact = await ContactModel.create(req.body);

    return res.status(201).send(newContact);
  } catch (err) {
    next(err);
  }
};

exports.getContacts = async (req, res, next) => {
  try {
    const contacts = await ContactModel.find();
  
    if (!contacts.length) {
      return res.status(400).send("You dont have any contacts");
    }
    return res.status(200).send(contacts);
  } catch (err) {
    next(err);
  }
};

exports.getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await ContactModel.findById(contactId);
    if (!contact) {
      return res.status(404).send({ message: "Contact not found" });
    }
    return res.status(200).send(contact);
  } catch (err) {
    next(err);
  }
};

exports.updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
       const contactForUpdate = req.body;
    const updatedContact = await ContactModel.findByIdAndUpdate(contactId, contactForUpdate, { new: true });
 
    console.log(contact)
    if (!updatedContact) {
      return res.status(404).send({ message: "Contact not found" });
    }
    return res.status(200).send(updatedContact);
  
  } catch (err) {
    next(err);
  }
};

exports.removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactToDelete = await ContactModel.findByIdAndDelete(contactId);
  
    if (!contactToDelete) {
      return res.status(404).send({ message: "Contact not found" });
    }
    return res.status(200).send({ message: "Contact deleted" });
  } catch (err) {
    next(err);
  }
};