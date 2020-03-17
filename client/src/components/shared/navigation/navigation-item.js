import React, { Component } from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class NavigationItem extends Component {
  render() {
    const { clName, link, name } = this.props;
    return (
      <nav>
        <Nav.Item className={clName}>
          <Link to={link}>{name}</Link>
        </Nav.Item>
      </nav>
    );
  }
}

NavigationItem.propTypes = {
  clName: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default NavigationItem;
