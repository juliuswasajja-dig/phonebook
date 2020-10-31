const inquirer = require('inquirer');

const menu = () => {
  const question = [
    {
      type: 'rawlist',
      name: 'option',
      message: 'Make a selection',
      choices: [
        'Add contact',
        'Search contact',
        'View contacts',
        'Update contact',
        'Delete contact',
        'Exit',
      ],
    },
  ];
  return inquirer.prompt(question);
};

const navigate = () => {
  const question = [
    {
      type: 'rawlist',
      name: 'navigate',
      message: 'What would you like',
      choices: [
        'Menu',
        'Exit',
      ],
    },
  ];
  return inquirer.prompt(question);
};

const name = () => {
  const question = [
    {
      name: 'name',
      type: 'input',
      message: 'Enter name: ',
      validate(value) {
        if (value.length) {
          return true;
        }
        return 'Enter a name.';
      },
    },
  ];
  return inquirer.prompt(question);
};

const telephone = () => {
  const question = [
    {
      name: 'telephone',
      type: 'input',
      message: 'Enter telephone: ',
      validate(value) {
        if (value.length) {
          return true;
        }
        return 'Enter a telephone.';
      },
    },
  ];
  return inquirer.prompt(question);
};

module.exports = {
  menu,
  navigate,
  name,
  telephone,
};
