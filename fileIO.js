const fs = require('fs');
const chalk = require('chalk');

const file = 'address-book.json';

// writing to file
const write = (myData) => {
  let result;
  try {
    const data = JSON.stringify(myData);
    fs.writeFileSync(file, data);
    result = 0;
  } catch (err) {
    // An error occurred
    fs.writeFileSync('error.log', err);
    result = chalk.red('Error writing to file. Details in ./error.log');
  }
  return result;
};
// reading from file
const read = () => {
  let result;
  try {
    const data = fs.readFileSync(file);
    result = JSON.parse(data);
  } catch (err) {
    fs.writeFileSync('error.log', err);
    result = chalk.red('Error reading file. Details in ./error.log');
  }
  return result;
};

module.exports = {
  read,
  write,
};
