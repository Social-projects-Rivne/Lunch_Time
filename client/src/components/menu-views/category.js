import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';

class Category extends Component {
  render() {
    const { category } = this.props;
    return (
      <Container className="col-item">
        <br />
        {category.name}
      </Container>
    );
  }
}

Category.propTypes = {
  category: PropTypes.any.isRequired,
};
export default Category;
