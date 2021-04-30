import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Item, Container, Header, Loader, Card } from 'semantic-ui-react';
import { Contacts } from '../../api/contact/Contacts';
import Product from '../components/Product';
import { Products } from '../../api/product/Products';

class UserProfile extends React.Component {

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const username = _.pluck(Contacts.collection.find({ _id: this.props.doc._id }).fetch(), 'owner');
    const prod1 = _.filter(this.props.products, function (prods) {
      if (username === prods.owner) {
        return prods;
      }
      return 0;
    });

    return (
      <Container>
        <Header as="h2">User Profile</Header>
        <Item.Group>
          <Item>
            <Item.Image size='medium' src={this.props.doc.image} />

            <Item.Content>
              <Item.Header textAlign={'left'}>{this.props.doc.name}</Item.Header>
              <Item.Meta>
                <span className='email'>{this.props.doc.email}</span>
              </Item.Meta>
              <Item.Description>User email: {this.props.doc.owner} {Meteor.userId()} {this.props.doc._id}</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
        <Header as="h2" textAlign="center">User Products</Header>
        <Card.Group>
          {this.props.products.map((product, index) => <Product key={index} product={product} />)}
        </Card.Group>
      </Container>
    );
  }
}

UserProfile.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  products: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(({ match }) => {
  const documentId = match.params._id;
  const subscription = Meteor.subscribe(Contacts.userPublicationName);
  const ready = subscription.ready();
  const doc = Contacts.collection.findOne(documentId);
  const subscription2 = Meteor.subscribe(Products.userPublicationName);
  const ready2 = subscription2.ready();
  const products = Products.collection.find({ }).fetch();
  return {
    doc,
    products,
    ready,
    ready2,
  };
})(UserProfile);
