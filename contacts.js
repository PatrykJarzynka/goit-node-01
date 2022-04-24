const fs = require('fs').promises;
const { writeFile, fdatasync } = require('fs');
const path = require('path');

const contactsPath = path.join(__dirname, "/db/contacts.json")

const readContacts = () => {
    return fs.readFile(contactsPath).then(response => { 
         const stringData = response.toString();
         const jsonData = JSON.parse(stringData);
         return jsonData;
     }).catch(error => console.log(error))
}

function listContacts() {
    fs.readFile(contactsPath).then(response => { 
         const stringData = response.toString();
         console.log(stringData)
     }).catch(error => console.log(error))
}

function getContactById(contactId) {
    return readContacts().then(response => {
         return response.find(contact => contact.id === contactId.toString() )
     })
}

function removeContact(contactId) {
     readContacts().then(response => {
        const newArray = response.filter(contact => contact.id !== contactId.toString());
        stringArray = JSON.stringify(newArray)
        fs.writeFile(contactsPath,stringArray)
     })
}

function addContact(name, email, phone) {
    readContacts().then(response => {
        const newId = response.length + 1;
        console.log(newId)
    })
   
}

addContact()