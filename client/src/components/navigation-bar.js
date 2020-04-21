import React, { Component } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavigationItem from './shared/navigation/navigation-item';
import '../styles/navbar.css';

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.links = [
      {
        link: '/restaurants', name: 'Restaurants', isUnAuthenticatedSee: true, isAuthenticatedSee: true,
      },
      {
        link: '/events', name: 'Events', isUnAuthenticatedSee: true, isAuthenticatedSee: true,
      },
      {
        link: '/map', name: 'Map', isUnAuthenticatedSee: true, isAuthenticatedSee: true,
      },
      {
        link: '/login', name: 'Login', isUnAuthenticatedSee: true, isAuthenticatedSee: false,
      },
      {
        link: '/registration', name: 'Registration', isUnAuthenticatedSee: true, isAuthenticatedSee: false,
      },
      {
        link: '/profile', name: 'Profile', isUnAuthenticatedSee: false, isAuthenticatedSee: true,
      },
    ];
  }

  showLogoutLink(className, callback) {
    return (
      <Nav.Item
        className={className}
        onClick={() => {
          callback();
        }}
      >
        <Link className="link" to="/">Logout</Link>
      </Nav.Item>
    );
  }

  render() {
    const { isAuthenticated, logoutHandler } = this.props;
    const className = 'mr-3';

    return (
      <Navbar expand="lg" bg="black" variant="dark">
        <Navbar.Brand>
          <img
            alt=""
            src="/img/logo.jpg"
            width="35"
            height="35"
            className="d-inline-block align-top"
          />
          {' '}
          <Link className="link" to="/">Lunch Time</Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto" bg="dark">
            {this.links
              .filter((link) => {
                if (isAuthenticated) {
                  return link.isAuthenticatedSee === true;
                }
                return link.isUnAuthenticatedSee === true;
              })
              .map((e) => (
                <NavigationItem
                  className={className}
                  link={e.link}
                  name={e.name}
                  key={e.link}
                />
              ))}
            {isAuthenticated ? this.showLogoutLink(className, logoutHandler) : null}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

NavigationBar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logoutHandler: PropTypes.func.isRequired,
};

export default NavigationBar;
