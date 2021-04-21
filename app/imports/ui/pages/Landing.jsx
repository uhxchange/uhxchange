import React from 'react';
import { Button, Grid, Header } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <div className='landing-background-page'>
        <Grid verticalAlign='middle' textAlign='center' container>
          <Grid.Row>
            <Header as='h1' inverted> Welcome to UHXchange </Header>
          </Grid.Row>
          <Grid.Row>
            <Header as='h3' inverted>
              Welcome to UHXchange! This is a web application solely for the University of Hawaii community in which
              users can sell goods. All you have to do is sign up if you do not have an account with us, or login
              with an account you already own.
            </Header>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={2}>
              <Button as={NavLink} exact to="/signin">Sign In</Button>
            </Grid.Column>
            <Grid.Column width={2}>
              <Button as={NavLink} exact to="/signup">Sign Up</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Landing;
