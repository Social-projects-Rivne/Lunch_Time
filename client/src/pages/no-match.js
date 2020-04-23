import React, { Component } from 'react';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/no-match.css';

class NoMatch extends Component {
  render() {
    return (
      <Container fluid className="no-match text-center">
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <div style={{ marginTop: -100 }}>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <h3>Oooops, this page doesn't exist...</h3>
          <Link to="/">
            <Button className="m-button">Go to Home page</Button>
          </Link>
        </div>
      </Container>
    );
  }
}

export default NoMatch;
