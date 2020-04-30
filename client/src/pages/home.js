import React, { Component } from 'react';
import { Button, ButtonToolbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/app.css';

class Home extends Component {
  render() {
    return (
      <Container fluid className="home">
        <div className="home-title text-center">
          <h1 className="title">Lunch Time</h1>
          <h3 className="titles">Online reservation service</h3>
          <ButtonToolbar className="justify-content-center mt-5">
            <Link to="/restaurants">
              <Button size="lg" variant="warning" className="btn-restaurants">Restaurants</Button>
            </Link>
          </ButtonToolbar>
        </div>
      </Container>
    );
  }
}

export default Home;
