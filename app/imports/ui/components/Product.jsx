import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Product extends React.Component {
  render() {
    return (
        <Card centered>
          <Card.Content>
            <Image
                floated='right'
                size='mini'
                src={this.props.product.image}
            />
            <Card.Header>{this.props.product.productName} {this.props.product.productType}</Card.Header>
            <Card.Meta>Meta</Card.Meta>
            <Card.Description>
              {this.props.product.description}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Link to={`/editp/${this.props.product._id}`}>Edit</Link>
          </Card.Content>
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