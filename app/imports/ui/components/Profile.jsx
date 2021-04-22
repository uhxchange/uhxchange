import React from 'react'
import { Meteor } from 'meteor/meteor';
import { Grid, Item } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Profile extends React.Component {
  render() {
    return (
        <Grid.Column textAlign={'center'}>
          <Item.Group>
            <Item>
              <Item.Image size='tiny' src={this.props.contact.image} />

              <Item.Content>
                <Item.Header>{this.props.contact.name}</Item.Header>
                <Item.Meta>
                  <span className='email'>{this.props.contact.email}</span>
                </Item.Meta>
                <Item.Description>{this.props.contact.owner}</Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
          {Roles.userIsInRole(Meteor.userId(), ['admin', '']) ? (
                <Link to={`/edit/${this.props.contact._id}`}>Edit</Link>) : ''}
        </Grid.Column>
    );
  }
}

/** Require a document to be passed to this component. */
Profile.propTypes = {
  contact: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Profile);