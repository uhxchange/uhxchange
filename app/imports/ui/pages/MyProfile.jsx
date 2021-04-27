import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Grid } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Contacts } from '../../api/contact/Contacts';
import Profile from '../components/Profile';

/** Renders a table containing all of the vendor documents. Use <MyVendorData> to render each row. */
class MyProfile extends React.Component {
  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting Profile data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const currentId = Meteor.userId();
    const username = Meteor.users.findOne({ _id: currentId }).username;

    const info1 = _.filter(this.props.contacts, function (infos) {
      if (username === infos.owner) {
        return infos;
      }
      return 0;
    });
    return (
        <Grid id="my-profile-page" container centered>
          <Header as="h2" textAlign="center">My Profile</Header>
          <Container>
              {info1.map((info) => <Profile key={info._id} info={info} Contacts={Contacts}/>)}

          </Container>
        </Grid>
    );
  }
}

// Require an array of Vendor documents in the props.
MyProfile.propTypes = {
  contacts: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Vendor documents.
  const subscription = Meteor.subscribe(Contacts.userPublicationName);
  // Get access to FoodMenus documents.
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Vendor documents
  const contacts = Contacts.collection.find({}).fetch();
  return {
    contacts,
    ready,
  };
})(MyProfile);