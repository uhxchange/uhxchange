import React from 'react';
import { Container, Grid, Header, Image, Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <div>
        <Container className='landing-top'>
          <Header as='h3' id='text1' align='center' inverted>
              Welcome to UHXchange!
          </Header>
          <Header as='h3' id='text2' align='center' inverted>
              The UHXchange is a web application for UHM students to facilitate buying and selling of student-related goods and services. All you have to do is sign up if you do not have an account with us or log in
              with an account you already own.
          </Header>
          <Grid verticalAlign='middle' textAlign='center' container>
            <Grid.Column width={2}>
              <Button as={NavLink} exact to="/signin" color='olive'>Sign In</Button>
            </Grid.Column>
            <Grid.Column width={2}>
              <Button as={NavLink} exact to="/signup" color='olive'>Sign Up</Button>
            </Grid.Column>
          </Grid>
        </Container>
        <Container className= 'landing-middle'>
          <Grid container columns= "three">
            <Grid.Column>
              <Image src="https://file.miricanvas.com/design_thumb/2021/05/02/13/00/34e09d63c5cb4f/thumb.jpg"/>
            </Grid.Column>
            <Grid.Column>
              <Image src="https://file.miricanvas.com/design_thumb/2021/05/02/13/00/41e47d2ed64a47/thumb.jpg"/>
            </Grid.Column>
            <Grid.Column>
              <Image src="https://file.miricanvas.com/design_thumb/2021/05/02/13/00/84ddc5de0e5c4b/thumb.jpg"/>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default Landing;
