import React from 'react';
import { Grid, Image, Header, Container } from 'semantic-ui-react';

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
