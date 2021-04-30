import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Grid, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Contacts } from '../../api/contact/Contacts';
import Profile from '../components/Profile';
import { Products } from '../../api/product/Products';
import Product from '../components/Product';

/** Renders a table containing all of the vendor documents. Use <MyVendorData> to render each row. */
class MyProfile extends React.Component {
  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting Profile data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const username = Meteor.users.findOne({ _id: Meteor.userId() }).username;

    const prof1 = _.filter(this.props.contacts, function (profs) {
      if (username === profs.owner) {
        return profs;
      }
      return 0;
    });

    const prod1 = _.filter(this.props.products, function (prods) {
      if (username === prods.owner) {
        return prods;
      }
      return 0;
    });
    return (
      <Grid id="my-profile-page" container centered>
        <Header as="h2" textAlign="center">My Profile</Header>
        <Container>
          {prof1.map((prof) => <Profile key={prof._id} info={prof} Contacts={Contacts}/>)}
          <Header as="h2" textAlign="center">My Products</Header>
          <Card.Group>
            {prod1.map((product, index) => <Product key={index} product={product} />)}
          </Card.Group>
        </Container>
      </Grid>
    );
  }
}

// Require an array of Vendor documents in the props.
MyProfile.propTypes = {
  contacts: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  products: PropTypes.array.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Vendor documents.

  const subscription = Meteor.subscribe(Contacts.userPublicationName);
  const subscription2 = Meteor.subscribe(Products.userPublicationName);
  const ready = subscription.ready();
  const ready2 = subscription2.ready();
  // Get the Vendor documents
  const contacts = Contacts.collection.find({}).fetch();
  const products = Products.collection.find({ }).fetch();
  return {
    contacts,
    products,
    ready,
    ready2,
  };
})(MyProfile);
