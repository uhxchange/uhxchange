import React from 'react';
import { Feed, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Review extends React.Component {
  render() {
    return (
      <Feed.Content>
        <Feed.Date content={this.props.review.createdAt.toLocaleDateString('en-US')} />
        <Feed.Summary>
          <Header as='h5'>{this.props.review.userName}</Header>
          {this.props.review.userReview}
        </Feed.Summary>
      </Feed.Content>
    );
  }
}

// Require a document to be passed to this component.
Review.propTypes = {
  review: PropTypes.shape({
    userName: PropTypes.string,
    userReview: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Review);
