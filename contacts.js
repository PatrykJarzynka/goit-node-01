const fs = require("fs").promises;
const { writeFile, fdatasync } = require("fs");
const { get } = require("http");
const path = require("path");

const contactsPath = path.join(__dirname, "/db/contacts.json");

//funkcja pomocnicza do przekazywania kontaktów z pliku contacts.json
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

//funkcja wyświetlająca listę kontaktów
function listContacts() {
  fs.readFile(contactsPath)
    .then((response) => {
      const stringData = response.toString();
      const objectData = JSON.parse(stringData);
      console.table(objectData)
    })
    .catch((error) => console.log(error));
}

//funkcja wyświetlająca konkretny kontakt po id
function getContactById(contactId) {
  return readContacts()
    .then((response) => {
      const foundContact = response.find(
        (contact) => contact.id.toString() === contactId.toString()
      );
      console.log(foundContact);
    })
    .catch((error) => console.log(error));
}

//funkcja usuwająca kontakt z bazy
function removeContact(contactId) {
  readContacts()
    .then((response) => {
      const newArray = response.filter(
        (contact) => contact.id.toString() !== contactId
      );
      // porządkowanie id dla skróconej bazy kontaktów, w kolejności rosnacej
      const elements = newArray.length;
      for (let i = 0; i < elements; i++) {
        newArray[i].id = i + 1;
      }
      //zmiana zawartości pliku
      stringArray = JSON.stringify(newArray);
      fs.writeFile(contactsPath, stringArray);
    })
    .catch((error) => console.log(error));
}

//funkcja dodająca kontakt do bazy
function addContact(name, email, phone) {
  readContacts()
    .then((response) => {
      const contact = { id: 0, name: name, email: email, phone: phone };
      response.push(contact);
      // porządkowanie id dla zwiększonej bazy kontaktów, w kolejności rosnacej
      const elements = response.length;
      for (let i = 0; i < elements; i++) {
        response[i].id = i + 1;
      }
      //zmiana zawartości pliku
      stringArray = JSON.stringify(response);
      fs.writeFile(contactsPath, stringArray);
    })
    .catch((error) => console.log(error));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
