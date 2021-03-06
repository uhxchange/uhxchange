import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Image } from 'semantic-ui-react';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const menuStyle = { marginBottom: '10px' };
    return (
      <Menu style={menuStyle} attached="top" borderless id='topmenu'>
        <Menu.Item as={NavLink} activeClassName="" exact to="/home">
          <Image src="https://file.miricanvas.com/design_thumb/2021/05/02/09/30/fc69092420e24b/thumb.jpg"/>
        </Menu.Item>
        {this.props.currentUser ? (
          [
            <Menu.Item id='navbar-shop-page' as={NavLink} activeClassName="active" exact to="/shop" key='shop'>SHOP</Menu.Item>,
            <Menu.Item id='navbar-sell-page' as={NavLink} activeClassName="active" exact to="/sell" key='sell'>SELL</Menu.Item>,
            <Menu.Item id='navbar-community-page' as={NavLink} activeClassName="active" exact to="/list" key='list'>COMMUNITY</Menu.Item>,
            <Menu.Item id='navbar-review-page' as={NavLink} activeClassName="active" exact to="/review" key='review'>REVIEWS!</Menu.Item>]
        ) : ''}
        <Menu.Item position="right">
          {this.props.currentUser ? (
            [<Menu.Item id='navbar-profile-page' position="right" as={NavLink} activeClassName="active" exact to="/profile" key='review'>MY PROFILE</Menu.Item>]
          ) : ''}
          {this.props.currentUser === '' ? (
            <Dropdown id="login-dropdown" text="Login" pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                <Dropdown.Item id="login-dropdown-sign-in" icon="user" text="Sign In" as={NavLink} exact to="/signin"/>
                <Dropdown.Item id="login-dropdown-sign-up" icon="add user" text="Sign Up" as={NavLink} exact to="/signup"/>
              </Dropdown.Menu>
            </Dropdown>) : (
            <Dropdown id="navbar-current-user" text={this.props.currentUser} pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                <Dropdown.Item id="navbar-sign-out" icon="sign out" text="Sign Out" as={NavLink} exact to="/signout"/>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Menu.Item>
      </Menu>
    );
  }
}

// Declare the types of all properties.
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

// Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter
export default withRouter(NavBarContainer);
