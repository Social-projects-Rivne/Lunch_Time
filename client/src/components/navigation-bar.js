import React, { Component } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavigationItem from './shared/navigation/navigation-item';
import info from './info/navigation';
import lognavigation from './info/lognavigation';

class NavigationBar extends Component {
  // eslint-disable-next-line consistent-return
  constructor(props) {
    super(props);
    this.state = {
      isAuthentificated: false,
    };
  }

  componentDidMount() {
    if (localStorage.getItem('Bearer ') != null) {
      this.setState({ isAuthentificated: true });
    }
    window.setInterval(() => {
      if (localStorage.getItem('Bearer ') != null) {
        this.setState({ isAuthentificated: true });
      } else {
        this.setState({ isAuthentificated: false });
      }
    }, 500);
  }


  renderFunctio(className) {
    if (this.state.isAuthentificated) {
      return lognavigation.map((e) => (
        <NavigationItem
          className={className}
          link={e.link}
          name={e.name}
          key={e.link}
        />
      ));
    }
    return info.map((e) => (
      <NavigationItem
        className={className}
        link={e.link}
        name={e.name}
        key={e.link}
      />
    ));
  }


  render() {
    const className = 'mr-3';
    const navBarContent = this.renderFunctio(className);

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
