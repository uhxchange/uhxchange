import _ from 'lodash';
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Search, Grid, Container, Loader, Card, Header } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Product from '../components/Product';
import { Products } from '../../api/product/Products';
import ProductResult from '../components/ProductResult';

const initialState = {
  results: [],
  value: '',
};

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListProducts extends React.Component {

  constructor(props) {
    super(props);
    this.state = { results: [], value: '' };
  }

  resultRenderer = ({ productName, productImage, description, owner }) => <ProductResult productName={productName} productImage={productImage} description={description} owner={owner}/>

  handleSearchChange = (e, data) => {
    this.setState({ loading: true, value: data.value });
    if (data.value.length === 0) {
      this.setState(initialState);
      return;
    }

    const re = new RegExp(_.escapeRegExp(data.value), 'i');
    const isMatch = (result) => re.test(result.productName) || re.test(result.description);

    this.setState({
      loading: false,
      results: _.filter(this.props.products, isMatch),
    });
  }

  onResultSelect = (e, data) => {
    this.setState({ value: data.result.productName });
    const re = new RegExp(_.escapeRegExp(data.result.productName), 'i');
    const isMatch = (result) => re.test(result.productName);

    this.setState({
      loading: false,
      results: _.filter(this.props.products, isMatch),
    });
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const { loading, results, value } = this.state;
    return (
      <Grid container>
        <Grid.Column centered>
          <Search placeholder="Find your favorite items" id='searchbar'
            loading={loading}
            onResultSelect={this.onResultSelect}
            onSearchChange={this.handleSearchChange}
            resultRenderer={this.resultRenderer}
            results={results}
            value={value}
          />
          <Container id='results'>
            <Card.Group centered>{results.map((product) => <Product key={product._id} product={product}/>)}</Card.Group>
            <Card.Group>
              {this.props.products.map((product, index) => <Product key={index} product={product} />)}
            </Card.Group>
          </Container>
        </Grid.Column>
      </Grid>
    );
  }
}

// Require an array of Stuff documents in the props.
ListProducts.propTypes = {
  products: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Products.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const products = Products.collection.find({}).fetch();
  return {
    products,
    ready,
  };
})(ListProducts);
