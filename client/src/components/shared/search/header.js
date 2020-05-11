import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Title from './title';
import Input from './input';

class Header extends Component {
  render() {
    const {
      containerClassName, title, placeHolder,
    } = this.props;
    return (
      <Container fluid className={containerClassName}>
        <Title title={title} />
        <Input placeHolder={placeHolder} filter={(f) => this.props.filter(f)} />
      </Container>
    );
  }
}

Header.defaultProps = {
  containerClassName: 'page-header',
};

Header.propTypes = {
  containerClassName: PropTypes.string,
  title: PropTypes.string.isRequired,
  placeHolder: PropTypes.string.isRequired,
  filter: PropTypes.func.isRequired,
};

export default Header;
