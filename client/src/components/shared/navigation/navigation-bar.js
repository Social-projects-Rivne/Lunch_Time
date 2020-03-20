import React, { Component } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavigationItem from './navigation-item';
import info from '../../info/navigation';

class NavigationBar extends Component {
  render() {
    const className = 'mr-3';
    const navBarContent = info.map((e) => (
      <NavigationItem
        className={className}
        link={e.link}
        name={e.name}
        key={e.link}

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
