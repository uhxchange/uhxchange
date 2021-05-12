import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Contacts } from '../../api/contact/Contacts';
import { Products } from '../../api/product/Products';
import { Reviews } from '../../api/review/Reviews';

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise publish nothing.

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise publish nothing.
Meteor.publish(Reviews.userPublicationName, function () {
  if (this.userId) {
    return Reviews.collection.find({});
  }
  return this.ready();
});

Meteor.publish(Contacts.userPublicationName, function () {
  if (this.userId) {
    // const username = Meteor.users.findOne(this.userId).username;
    return Contacts.collection.find({ });
  }
  return this.ready();
});

Meteor.publish(Products.userPublicationName, function () {
  if (this.userId) {
    // const username = Meteor.users.findOne(this.userId).username;
    return Products.collection.find();
  }
  return this.ready();
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise publish nothing.

Meteor.publish(Contacts.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Contacts.collection.find();
  }
  return this.ready();
});

Meteor.publish(Products.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Products.collection.find();
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
