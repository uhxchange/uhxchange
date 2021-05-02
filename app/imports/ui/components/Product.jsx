import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Image, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Product extends React.Component {
  removeProduct(ProductID) {
    this.props.product.collection.remove(ProductID);
  }

  render() {
    return (
      <Card centered>
        <Card.Content>
          <Link to={`/product/${this.props.product._id}`}>
            <Image src={this.props.product.productImage} />
          </Link>
          <Card.Header>{this.props.product.productName}</Card.Header>
          <Card.Description>
            {this.props.product.description}
          </Card.Description>
        </Card.Content>
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
          <Card.Content extra>
            <Link to={`/editp/${this.props.product._id}`}>Edit</Link>
          </Card.Content>
        ) : ''}
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
          <Card.Content extra>
            <Button icon onClick={() => this.removeProduct(this.props.product._id)}>
              <Icon name='trash'/>
            </Button>
          </Card.Content>
        ) : ''}
      </Card>
    );
  }
}

// Require a document to be passed to this component.
Product.propTypes = {
  product: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Product);
