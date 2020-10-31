const chalk = require('chalk');
const clear = require('clear');
const inquirer = require('./userInput');
const {
  deleteContact,
  update,
  view,
  search,
  add,
} = require('./operations');

const back = async () => {
  const params = await inquirer.navigate();
  const { navigate } = params;
  if (navigate === 'Menu') main();
  if (navigate === 'Exit') process.exit();
};

const main = async () => {
  clear();
  const params = await inquirer.menu();
  const { option } = params;
  if (option === 'Exit') process.exit();
  if (option === 'View contacts') {
    const contacts = view();
    console.table(contacts);
    back();
  }
  if (option === 'Search contact') {
    const { name } = await inquirer.name();
    console.log(`${name}: ${chalk.green(search(name))}`);
    back();
  }
  if (option === 'Delete contact') {
    const { name } = await inquirer.name();
    deleteContact(name);
    back();
  }
  if (option === 'Add contact') {
    const { name } = await inquirer.name();
    const { telephone } = await inquirer.telephone();
    add(name, telephone);
    back();
  }
  if (option === 'Update contact') {
    const { name } = await inquirer.name();
    const { telephone } = await inquirer.telephone();
    update(name, telephone);
    back();
  }
};

main();

module.exports = {
  back,
  main,
};
