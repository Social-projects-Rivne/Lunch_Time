import React, { Component } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import navigationBarData from '../../data/navigation-bar-data';
import NavigationItem from './navigation-item';

class NavigationBar extends Component {
  render() {
    const className = 'mr-3';
    const navBarContent = navigationBarData.map((e) => (
      <NavigationItem
        clName={className}
        link={e.link}
        name={e.name}
      />
    ));
    return (
      <Navbar expand="lg" bg="light">
        <Navbar.Brand>
          <img
            alt=""
            src="/img/logo.jpg"
            width="35"
            height="35"
            className="d-inline-block align-top"
          />
          {' '}
          <Link to="/">Lunch Time</Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto" bg="dark">
            {navBarContent}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavigationBar;
