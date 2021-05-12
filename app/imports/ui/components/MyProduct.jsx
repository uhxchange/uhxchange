import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Image, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class MyProduct extends React.Component {
  removeProduct(productID) {
    console.log(`item to delete is: ${productID}`);
    this.props.Products.collection.remove(productID);
  }

  render() {
    const username = Meteor.users.findOne({ _id: Meteor.userId() }).username;
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
        <Card.Content extra>
          {this.props.product.owner === username ? <Link to={`/editp/${this.props.product._id}`}>Edit </Link> : <Link to={`/product/${this.props.product._id}`}>Go to Product Page</Link>}
        </Card.Content>
        <Card.Content extra>
          {this.props.product.owner === username ? <Button icon onClick={() => this.removeProduct(this.props.product._id)}>
            <Icon name='trash'/>
          </Button> : null }
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
MyProduct.propTypes = {
  product: PropTypes.object.isRequired,
  Products: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(MyProduct);
