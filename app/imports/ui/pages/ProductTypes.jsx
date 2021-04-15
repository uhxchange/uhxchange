import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Card, Image } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Contacts } from '../../api/contact/Contacts';
import { Products } from '../../api/product/Products';

/** Component for layout out a Project Card. */
const MakeCard = (props) => (
  <Card>
    <Card.Content>
      <Card.Header style={{ marginTop: '0px' }}>{props.product.productType}</Card.Header>
    </Card.Content>
    <Card.Content extra>
      {_.map(props.product.participants, (p, index) => <Image key={index} circular size='mini' src={p}/>)}
    </Card.Content>
  </Card>
);

MakeCard.propTypes = {
  product: PropTypes.object.isRequired,
};

/** Renders the Project Collection as a set of Cards. */
class ProductsPage extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    // const types = _.pluck(Products.collection.find().fetch(), 'productType');
    return (
      <Container>
        <Card.Group>
        </Card.Group>
      </Container>
    );
  }
}

ProductsPage.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub1 = Meteor.subscribe(Contacts.userPublicationName);
  const sub2 = Meteor.subscribe(Products.userPublicationName);
  return {
    ready: sub1.ready() && sub2.ready(),
  };
})(ProductsPage);
