import _ from 'lodash';
import React from 'react';
import { Search, Grid, Header, Container, Loader, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Products } from '../../api/product/Products';
import ProductResult from '../components/ProductResult';
import Product from '../components/Product';

const initialState = {
  results: [],
  value: '',
};

class SearchProduct extends React.Component {

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
      results: _.filter(this.props.product, isMatch),
    });
  }

  onResultSelect = (e, data) => {
    this.setState({ value: data.result.productName });
    const re = new RegExp(_.escapeRegExp(data.result.productName), 'i');
    const isMatch = (result) => re.test(result.productName);

    this.setState({
      loading: false,
      results: _.filter(this.props.product, isMatch),
    });
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const { loading, results, value } = this.state;

    return (
      <Grid container>
        <Grid.Column centered>
          <Search
            loading={loading}
            onResultSelect={this.onResultSelect}
            onSearchChange={this.handleSearchChange}
            resultRenderer={this.resultRenderer}
            results={results}
            value={value}
          />

          <Container id='results'>
            <Header inverted>Results</Header>
            <Card.Group centered>{results.map((product) => <Product key={product._id} product={product}/>)}</Card.Group>
          </Container>
        </Grid.Column>
      </Grid>
    );
  }
}

SearchProduct.propTypes = {
  product: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // Get access to Product collection.
  const subscription = Meteor.subscribe(Products.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Product collection
  const product = Products.collection.find({}).fetch();
  return {
    product,
    ready,
  };
})(SearchProduct);
