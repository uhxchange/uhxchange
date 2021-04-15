import React from 'react';
import { Card, Image, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Product extends React.Component {
  render() {
    return (
      <Card centered>
        <Card.Content>
          <Image src={this.props.product.productImage}/>
          <Card.Header>{this.props.product.productName}</Card.Header>
          <Card.Description>
            {this.props.product.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name='user' />
            {this.props.product.owner}
          </a>
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
