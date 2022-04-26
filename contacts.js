const fs = require("fs").promises;
const { writeFile, fdatasync } = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "/db/contacts.json");

const readContacts = () => {
  return fs
    .readFile(contactsPath)
    .then((response) => {
      const stringData = response.toString();
      const jsonData = JSON.parse(stringData);
      return jsonData;
    })
    .catch((error) => console.log(error));
};

function listContacts() {
  fs.readFile(contactsPath)
    .then((response) => {
      const stringData = response.toString();
      console.log(stringData);
    })
    .catch((error) => console.log(error));
}

function getContactById(contactId) {
  return readContacts().then((response) => {
      return response.find((contact) => contact.id === contactId);
  });
}

function removeContact(contactId) {
  readContacts().then((response) => {
    const newArray = response.filter((contact) => contact.id.toString() !== contactId);
    const elements = newArray.length;
    for (let i = 0; i < elements; i++) {
      newArray[i].id = i + 1;
    }
    stringArray = JSON.stringify(newArray);
    fs.writeFile(contactsPath, stringArray);
  });
}

function addContact(name, email, phone) {
  readContacts().then((response) => {
    const contact = { id: 0, name: name, email: email, phone: phone };
    response.push(contact);
    const elements = response.length;
    for (let i = 0; i < elements; i++) {
      response[i].id = i + 1;
    }
    stringArray = JSON.stringify(response);
    fs.writeFile(contactsPath, stringArray);
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
