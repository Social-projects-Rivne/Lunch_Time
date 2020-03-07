import React, { Component } from 'react';
import { Tab, Tabs } from 'react-bootstrap';

class Restaurant extends Component {
  render() {
    return (
      <div>
        <Tabs defaultActiveKey="about">
          <Tab eventKey="about" title="About">
            <h2>About</h2>
          </Tab>
          <Tab eventKey="menu" title="Menu">
            <h2>Menu</h2>
          </Tab>
          <Tab eventKey="events" title="Events">
            <h2>Events</h2>
          </Tab>
          <Tab eventKey="feedback" title="Feedbacs">
            <h2>Feedback</h2>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default Restaurant;
