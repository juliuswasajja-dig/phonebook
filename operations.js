const { read, write } = require('./fileIO');
const Contact = require('./contact');

let contactlist = [];

const find = (name) => {
  const person = contactlist.find((contact) => contact.name === name);
  const index = contactlist.indexOf(person);
  if (index < 0) {
    throw new Error('Contact not found');
  }
  return index;
};

const add = (name, telephone) => {
  contactlist = read();
  const contact = new Contact(name, telephone);
  contactlist[contactlist.length] = contact;
  return write(contactlist);
};

const search = (name) => {
  contactlist = read();
  return contactlist[find(name)].telephone;
};

const view = () => read();

const update = (name, telephone) => {
  contactlist[find(name)].telephone = telephone;
  return write(contactlist);
};

const deleteContact = (name) => {
  contactlist.splice(find(name), 1);
  return write(contactlist);
};

module.exports = {
  deleteContact,
  update,
  view,
  search,
  add,
};
