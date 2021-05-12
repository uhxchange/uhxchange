import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Header, Feed, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Review from '../components/Review';
import { Reviews } from '../../api/review/Reviews';
import AddReview from '../components/AddReview';

class UserReview extends React.Component {
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
      <Grid id='navbar-review-page' container>
        <Grid.Row>
          <AddReview/>
        </Grid.Row>
        <Grid.Row>
          <Feed>
            {this.props.reviews.map((review, index) => <Review key={index} review={review} />)}
          </Feed>
        </Grid.Row>
      </Grid>
    );
  }
}

UserReview.propTypes = {
  reviews: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Reviews documents.
  const subscription = Meteor.subscribe(Reviews.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Reviews documents
  const reviews = Reviews.collection.find({}).fetch();
  return {
    reviews,
    ready,
  };
})(UserReview);
