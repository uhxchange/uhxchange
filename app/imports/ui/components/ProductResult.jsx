import React from 'react';
import { Image, List } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/SearchPosting.jsx. */
class ProductResult extends React.Component {
  render() {
    return (
      <List relaxed='very'>
        <List.Item>
          <List.Content>
            <Image floated='right' avatar src={this.props.productImage}/>
            <List.Header as='a'>{this.props.productName}</List.Header>
            <List.Description>{this.props.description}</List.Description>
          </List.Content>
        </List.Item>
      </List>
    );
  }
}

// Require a document to be passed to this component.
ProductResult.propTypes = {
  productName: PropTypes.string,
  productImage: PropTypes.string,
  description: PropTypes.string,
  owner: PropTypes.string,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(ProductResult);
