import React from 'react';
import { Grid, Item } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Profile extends React.Component {
  removeItem(InfoID) {
    this.props.contacts.collection.remove(InfoID);
  }

  render() {
    return (
      <Grid id='my-profile' verticalAlign='middle' textAlign='center' container>
        <Item.Group>
          <Item>
            <Item.Image size='medium' src={this.props.info.image} />
            <Item.Content>
              <Item.Header textAlign={'left'}>{this.props.info.name}</Item.Header>
              <Item.Meta>
                <span className='email'>{this.props.info.email}</span>
              </Item.Meta>
            </Item.Content>
          </Item>
          <Item>
            <Link to={`/edit/${this.props.info._id}`}>Edit</Link>
          </Item>
        </Item.Group>
      </Grid>
    );
  }
}

// <Link to={`/edit/${this.props.vendor._id}`}>Edit</Link>

// Require a document to be passed to this component.
Profile.propTypes = {
  info: PropTypes.object.isRequired,
  contacts: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Profile);
