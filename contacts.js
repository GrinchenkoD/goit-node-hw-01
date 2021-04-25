const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.join(__dirname, "db", "contacts.json");

// TODO: задокументировать каждую функцию
async function listContacts() {
  // ...твой код
  try {
    const response = await fs.readFile(contactsPath, "utf8");
    const data = await JSON.parse(response);
    console.table(data);
    return data;
  } catch (error) {
    console.log(err);
  }
}

async function getContactById(contactId) {
  try {
    const response = await fs.readFile(contactsPath, "utf8");
    const data = await JSON.parse(response);

    if (data.some((contact) => contact.id === contactId)) {
      const result = data.filter((contact) => contact.id === contactId);

      console.table(result);
      return result;
    } else {
      throw new Error("There is no contact with the specified ID");
    }
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const response = await fs.readFile(contactsPath, "utf8");
    const data = await JSON.parse(response);

    if (data.some((contact) => contact.id === contactId)) {
      const newContacts = data.filter((contact) => contact.id !== contactId);
      fs.writeFile(contactsPath, JSON.stringify(newContacts), "utf8");
      console.log("Contact successfully deleted");
      return;
    } else {
      throw new Error("There is no contact with the specified ID");
    }
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const response = await fs.readFile(contactsPath, "utf8");
    const oldContacts = await JSON.parse(response);

    let id = oldContacts.length
      ? +oldContacts[oldContacts.length - 1].id + 1
      : 1;

    const contact = { id, name, email, phone };
    const newContacts = [...oldContacts, contact];
    fs.writeFile(contactsPath, JSON.stringify(newContacts), "utf8");
    console.log("Contact successfully added");
    console.table(contact);
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
