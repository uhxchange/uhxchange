import React from 'react';
import { Grid, Header, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <Grid verticalAlign='middle' textAlign='center' container>
        <Grid.Row>
          <Header as='h1'> Welcome to UHXchange </Header>
        </Grid.Row>
        <Image src='https://www.moneycrashers.com/wp-content/uploads/2016/11/flea-market-shopping-tips-1068x713.jpg' size='small' floated='left'/>
        <p>
          Welcome to UHXchange! This is a web application solely for the University of Hawaii community in which
          users can sell goods. All you have to do is sign up if you do not have an account with us, or login
          with an account you already own. Then, simply go to the marketplace, search or browse any items on
          display!
        </p>
      </Grid>
    );
  }
}

export default Landing;
