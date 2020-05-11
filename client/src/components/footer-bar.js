import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import NavigationItem from './shared/navigation/navigation-item';
import footerInfo from './info/footer';
import '../styles/footer-bar.css';

class FooterBar extends Component {
  render() {
    const className = 'mr-3';
    const footerContent = footerInfo.map((e) => (
      <NavigationItem
        className={className}
        link={e.link}
        name={e.name}
        key={e.link}
      />
    ));
    return (
      <Navbar className="footer-bar" expand="lg" variant="dark" sticky="bottom" fixed="bottom">
        {footerContent}
      </Navbar>
    );
  }
}

export default FooterBar;
