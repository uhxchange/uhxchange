import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Item } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Profile from '../components/Profile';
import { Contacts } from '../../api/contact/Contacts';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ProfilePage extends React.Component {


  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting profile data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center">Profile</Header>
          {this.props.contacts.map((contact, index) => <Profile key={index} contact={contact} />)}
        </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
ProfilePage.propTypes = {
  contacts: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Contacts.userPublicationName);
  //const subscription2 = Meteor.subscribe(Contacts.adminPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  //const ready2 = subscription2.ready();
  // Get the Stuff documents
  const contacts = Contacts.collection.find({}).fetch();
  return {
    contacts,
    ready,
    //ready2,
  };
})(ProfilePage);
