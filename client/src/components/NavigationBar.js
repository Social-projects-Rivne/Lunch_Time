import React, { Component } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class NavigationBar extends Component {
  render() {
    return (
      <Navbar expand="lg" bg="light" >
          <Navbar.Brand>
            <img
              alt=""
              src="/img/logo.jpg"
              width="35"
              height="35"
              className="d-inline-block align-top"
            />{' '}
            <Link to="/">Lunch Time</Link>
          </Navbar.Brand>
          
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto" bg="dark">
        
            <Nav.Item className="mr-3">
                <Link to="/listRestaurant">ListRestaurant</Link>
            </Nav.Item>
            <Nav.Item className="mr-3">
                <Link to="/map">Map</Link>
            </Nav.Item>
            <Nav.Item className="mr-3">
                <Link to="/about">About</Link>
            </Nav.Item>
            <Nav.Item className="mr-3">
                <Link to="/contact">Contact</Link>
            </Nav.Item>
            <Nav.Item className="mr-3">
                <Link to="/login">Login</Link>
            </Nav.Item>
            <Nav.Item className="mr-3">
                <Link to="/registartion">Registartion</Link>
            </Nav.Item>
   
            {/* <Link to="/">Home</Link>
            <Link to="/listRestaurant">List Restaurant</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/login">Login</Link>
            <Link to="/registartion">Registartion</Link>
          */}
    
            {/* <Nav.Link href="/listRestaurant">List Restaurant</Nav.Link>
            <Nav.Link href="/map">Map</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/registartion">Registartion</Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavigationBar;

