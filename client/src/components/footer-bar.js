import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import NavigationItem from './shared/navigation/navigation-item';
import footerInfo from './info/footer';
import '../styles/footer.css';

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
      <Navbar className="footer" fixed="bottom" expand="lg" bg="light">
        {footerContent}
      </Navbar>
    );
  }
}

export default FooterBar;
