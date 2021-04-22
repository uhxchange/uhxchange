import React from 'react'
import { Meteor } from 'meteor/meteor';
import { Grid, Item } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Profile extends React.Component {
  render() {
    return (
        <Grid.Column textAlign={'center'}>
          <Item.Group>
            <Item>
              <Item.Image size='tiny' src={this.props.user.image} />

              <Item.Content>
                <Item.Header>{this.props.user.name}</Item.Header>
                <Item.Meta>
                  <span className='email'>{this.props.user.email}</span>
                </Item.Meta>
                <Item.Description>{this.props.user.owner}</Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
          {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
                <Link to={`/edit/${this.props.user._id}`}>Edit</Link>): ''}
        </Grid.Column>
    );
  }
}

/** Require a document to be passed to this component. */
Profile.propTypes = {
  user: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Profile);