// const fs = require("fs");
// const path = require("path");

// const contactsPath = path.join(__dirname, "/db/contacts.json");

// // TODO: задокументировать каждую функцию
// function listContacts() {
//   fs.readFile(contactsPath, "utf-8", (err, data) => {
//     if (err) return console.log(err);
//     console.table(JSON.parse(data));
//   });
// }

// function getContactById(contactId) {
//   fs.readFile(contactsPath, "utf-8", (err, data) => {
//     if (err) {
//       return console.log(err);
//     }
//     const parsedData = JSON.parse(data);
//     const getContact = parsedData.filter((el) => el.id === contactId);
//     console.table(getContact);
//   });
// }

// function removeContact(contactId) {
//   fs.readFile(contactsPath, "utf-8", (err, data) => {
//     if (err) {
//       return console.log(err);
//     }
//     const parsedData = JSON.parse(data);
//     const getContact = parsedData.filter((el) => el.id !== contactId);
//     const dataString = JSON.stringify(getContact);
//     fs.writeFile(contactsPath, dataString, (err) => {
//       if (err) return console.log(err);
//     });
//   });
// }

// function addContact(name, email, phone) {
//   fs.readFile(contactsPath, "utf-8", (err, data) => {
//     if (err) {
//       return console.log(err);
//     }
//     const contacts = JSON.parse(data);
//     contacts.push({
//       id: contacts.length + 1,
//       name: name,
//       email: email,
//       phone: phone,
//     });
//     console.table(contacts);
//     const stringData = JSON.stringify(contacts);
//     fs.writeFile(contactsPath, stringData, (err) => {
//       if (err) {
//         return console.log(err);
//       }
//     });
//   });
// }

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
// };
