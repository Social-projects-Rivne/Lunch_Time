import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Title from './title';
import Input from './input';

class Header extends Component {
  render() {
    const {
      containerClassName, h1ClassName, title, placeHolder,
    } = this.props;
    return (
      <Container fluid className={containerClassName}>
        <h1 className={h1ClassName}>
          <Title title={title} />
          <Input placeHolder={placeHolder} />
        </h1>
      </Container>
    );
  }
}

Header.defaultProps = {
  containerClassName: 'page-header',
  h1ClassName: 'page-header-title',
};

Header.propTypes = {
  containerClassName: PropTypes.string,
  h1ClassName: PropTypes.string,
  title: PropTypes.string.isRequired,
  placeHolder: PropTypes.string.isRequired,
};

export default Header;
