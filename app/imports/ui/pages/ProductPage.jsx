import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Card, Container, Image, Loader } from 'semantic-ui-react';
import { Contacts } from '../../api/contact/Contacts';
import Contact from '../components/Contact';
import { Products } from '../../api/product/Products';

class ProductPage extends React.Component {

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
      <Container>
        <Card.Group>
          {this.props.contacts.map((contact, index) => <Contact key={index} contact={contact} />)}
          <Card>
            <Card.Content>
              <Image src={this.props.doc.productImage}/>
              <Card.Header>{this.props.doc.productName}</Card.Header>
              <Card.Description>
                {this.props.doc.description}
              </Card.Description>
            </Card.Content>
            <Card.Content>
            </Card.Content>
          </Card>
        </Card.Group>
      </Container>
    );
  }
}

ProductPage.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  contacts: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(({ match }) => {
  const documentId = match.params._id;
  const subscription = Meteor.subscribe(Products.userPublicationName);
  const ready = subscription.ready();
  const doc = Products.collection.findOne(documentId);
  const subscription2 = Meteor.subscribe(Contacts.userPublicationName);
  const ready2 = subscription2.ready();
  const username = _.first(_.pluck(Products.collection.find(documentId).fetch(), 'owner'));
  const contacts = Contacts.collection.find({ owner: username }).fetch();
  console.log(contacts);
  return {
    doc,
    contacts,
    ready,
    ready2,
  };
})(ProductPage);
