import { Meteor } from 'meteor/meteor';
import { Contacts } from '../../api/contact/Contacts';
import { Products } from '../../api/product/Products';

/* eslint-disable no-console */

// Initialize the database with a default data document.
function addContact(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Contacts.collection.insert(data);
}

function addProduct(data) {
  console.log(`  Adding: ${data.productName} (${data.owner})`);
  Products.collection.insert(data);
}

// Initialize the StuffsCollection if empty.

if (Contacts.collection.find().count() === 0) {
  if (Meteor.settings.defaultContacts) {
    console.log('Creating default data.');
    Meteor.settings.defaultContacts.map(data => addContact(data));
  }
}

if (Products.collection.find().count() === 0) {
  if (Meteor.settings.defaultProducts) {
    console.log('Creating default product.');
    Meteor.settings.defaultProducts.map(data => addProduct(data));
  }
}
