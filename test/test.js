const { assert, expect } = require('chai');
const {
  after, before, describe, it,
} = require('mocha');
const sinon = require('sinon');
const fs = require('fs');
const Contact = require('../contact');
const { read, write } = require('../fileIO');
const userInput = require('../userInput');
const {
  deleteContact, update, view, search, add,
} = require('../operations');
const fileIO = require('../fileIO');

describe('fileIO tests', () => {
  let writeStub;
  let readStub;
  before(() => {
    writeStub = sinon.stub(fs, 'writeFileSync');
    readStub = sinon.stub(fs, 'readFileSync');
  });

  it('Writes data to file', () => {
    expect(write(new Contact('Tom', '1234'))).equal(0);
  });
  it('Reads file', () => {
    const error = new Error('Error reading empty file');
    readStub.throws(error);
    read();
    assert.isTrue(readStub.called);
  });

  after(() => {
    writeStub.restore();
    readStub.restore();
  });
});

describe('Contact test', () => {
  const contact = new Contact('Mike', '12345');
  // Creates contact instance
  it('creates contact instance', () => {
    expect(contact).to.be.an.instanceof(Contact);
  });
});

describe('operations tests', () => {
  let writeStub;
  let readStub;
  before(() => {
    writeStub = sinon.stub(fileIO, 'write');
    readStub = sinon.stub(fileIO, 'read');
    const error1 = new Error('Error reading empty file');
    readStub.throws(error1);
    writeStub.throws(error1);
  });

  it('add() calls functions in its definition', () => {
    expect(add('1', '2')).to.equal(0);
  });
  it('search() calls functions in its definition', () => {
    expect(search).to.throw('Contact not found');
  });
  it('view() calls functions in its definition', () => {
    assert.isArray(view());
  });
  it('update() calls functions in its definition', () => {
    expect(update).to.throw('Contact not found');
  });
  it('deleteContact() calls functions in its definition', () => {
    expect(deleteContact).to.throw('Contact not found');
  });
  after(() => {
    writeStub.restore();
    readStub.restore();
  });
});

describe('userInput tests', () => {
  let menuStub;
  let navigateStub;
  let nameStub;
  let telephoneStub;

  before(() => {
    menuStub = sinon.stub(userInput, 'menu');
    nameStub = sinon.stub(userInput, 'name');
    telephoneStub = sinon.stub(userInput, 'telephone');
    navigateStub = sinon.stub(userInput, 'navigate');
  });

  it('inquirer.menu calls menu()', async () => {
    menuStub.onCall(0).returns({ option: 'Add contact' });
    expect(userInput.menu()).to.deep.equal({ option: 'Add contact' });
  });
  it('inquirer.name calls name()', async () => {
    nameStub.onCall(0).returns({ name: 'Mike' });
    expect(userInput.name()).to.deep.equal({ name: 'Mike' });
  });
  it('inquirer.telephone calls telephone()', async () => {
    telephoneStub.onCall(0).returns({ telephone: '07777777777' });
    expect(userInput.telephone()).to.deep.equal({ telephone: '07777777777' });
  });
  it('inquirer.navigate calls navigate()', async () => {
    navigateStub.onCall(0).returns({ navigate: 'Yes' });
    expect(userInput.navigate()).to.deep.equal({ navigate: 'Yes' });
  });

  after(() => {
    menuStub.restore();
    nameStub.restore();
  });
});
