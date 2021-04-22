import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Item } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Profile from '../components/Profile';
import { Users } from '../../api/user/Users';

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
          {this.props.users.map((user, index) => <Profile key={index} user={user} />)}
        </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
ProfilePage.propTypes = {
  users: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Users.userPublicationName);
  //const subscription2 = Meteor.subscribe(Contacts.adminPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  //const ready2 = subscription2.ready();
  // Get the Stuff documents
  const users = Users.collection.find({}).fetch();
  return {
    users,
    ready,
    //ready2,
  };
})(ProfilePage);
