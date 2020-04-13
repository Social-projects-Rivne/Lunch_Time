import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import View from '../shared/dropdown/view';
import info from '../info/events';

class Header extends Component {
  onSelectCategory(path) {
    this.props.onChangeMenu(path);
  }

  render() {
    return (
      <Container>
        <Container className="header">
          <br />
          <h2>Menu </h2>
        </Container>
        <br />
        <Row>
          <Col>
            <View
              id="sort-by-sort-by-dishcategory"
              name="Category"
              values={info[2].values}
              onSelect={(e) => this.onSelectCategory(`${e}`)}
            />
          </Col>
          <Col className="headers-item">
            Dish
            <br />
            (Ingredients)
          </Col>
          <Col className="headers-item">
            Image
          </Col>
          <Col className="headers-item">
            Portion size
          </Col>
          <Col className="headers-item">
            Portion price
          </Col>
          <Col className="headers-item">
            Add to Order
          </Col>
        </Row>
        <hr className="menu-item" />
      </Container>
    );
  }
}

Header.propTypes = {
  onChangeMenu: PropTypes.any.isRequired,
};
export default Header;
