import React, { Component } from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class NavigationItem extends Component {
  render() {
    const { className, link, name } = this.props;
    return (
      <Nav.Item className={className}>
        <Link to={link}>{name}</Link>
      </Nav.Item>
    );
  }
}

NavigationItem.propTypes = {
  className: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default NavigationItem;
