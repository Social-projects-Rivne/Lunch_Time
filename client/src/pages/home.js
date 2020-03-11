import React, { Component } from 'react';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <Container className="containerButtonHome text-center">
        <Button size="lg" variant="outline-success">
          <Link to="/restaurants">ListRestaurant</Link>
        </Button>
      </Container>
    );
  }
}

export default Home;
