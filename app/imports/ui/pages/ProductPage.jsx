import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Card, Container, Loader } from 'semantic-ui-react';
import { Contacts } from '../../api/contact/Contacts';
import Contact from '../components/Contact';

class ProductPage extends React.Component {

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
      <Container>
        <Card>
          {this.props.contacts.map((contact, index) => <Contact key={index} contact={contact} />)}
        </Card>
      </Container>
    );
  }
}

ProductPage.propTypes = {
  contacts: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe(Contacts.userPublicationName);
  const ready = subscription.ready();
  const username = Meteor.users.findOne(this.userId).username;
  const contacts = Contacts.collection.find({ owner: username }).fetch();
  return {
    contacts,
    ready,
  };
})(ProductPage);
