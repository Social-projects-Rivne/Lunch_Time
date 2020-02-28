import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';


export const NavigationBar = () => (

    <Navbar expand="lg" bg="light" >
          <Navbar.Brand href="/">
      <img
        alt=""
        src="/img/logo.jpg"
        width="35"
        height="35"
        className="d-inline-block align-top"
      />{' '}
      Lunch Time
    </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
        <Nav.Link href="/listRestaurant">List Restaurant</Nav.Link>
        <Nav.Link href="/map">Map</Nav.Link>
        <Nav.Link href="/about">About</Nav.Link>
        <Nav.Link href="/contact">Contact</Nav.Link>
        <Nav.Link href="/login">Login</Nav.Link>
        <Nav.Link href="/registartion">Registartion</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
 
)