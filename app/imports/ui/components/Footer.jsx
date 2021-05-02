import React from 'react';
import { Grid, List, Header } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

export default class BottomMenu extends React.Component {
  render() {
    return (
      <div id='footer'>
        <Grid container columns = "three">
          <Grid.Column>
            <List size={'large'} inverted>
              <List.Item id='footer-title'>INFORMATION</List.Item>
              <hr/>
              <List.Item>About Us</List.Item>
              <List.Item>Contact Us</List.Item>
              <List.Item><a href={'/#/review'}>Community Feedback</a></List.Item>
            </List>
          </Grid.Column>
          <Grid.Column>
            <List size={'large'} inverted>
              <List.Item id='footer-title'>SHOP & SELL</List.Item>
              <hr/>
              <List.Item><a href={'/#/shop'}>Shop</a></List.Item>
              <List.Item><a href={'/#/sell'}>Sell</a></List.Item>
            </List>
          </Grid.Column>
          <Grid.Column>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
