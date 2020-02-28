import React, { Component } from 'react';
import { Button, Container } from 'react-bootstrap'

class Home extends Component {
    render() {
        return (
            <Container className="containerButtonHome text-center" >
                <Button href="/listRestaurant" size="lg" variant="outline-success">Booking Table</Button>
            </Container>
        );
    }
}

export default Home;