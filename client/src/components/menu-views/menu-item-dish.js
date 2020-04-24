import React, { Component } from 'react';
import {
  Container, Row,
  Image, Col, Button,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import Dish from './dish';
import Category from './category';
import Api from '../../services/api';


class MenuItemDish extends Component {
  render() {
    const { menuitemdishes } = this.props;
    return (
      <Container>
        {menuitemdishes.map((menuitemdish) => {
          return (
            <Row key={menuitemdish.id}>
              <Col>
                <Category category={menuitemdish.dish.categoryFood} />
              </Col>
              <Col>
                <Dish dish={menuitemdish} />
              </Col>
              <Col className="col-item">
                <Image
                  className="image-menu-item"
                  src={`${Api.apiUrl}images/dishes/${menuitemdish.imageUrl}`}
                  roundedCircle
                  width="150"
                  height="75"
                  alt="Dish image"
                />
              </Col>
              <Col className="col-item">
                <br />
                {menuitemdish.portionSize}
              </Col>
              <Col className="col-item">
                <br />
                {menuitemdish.portionPrice}
                {' '}
                {'  '}
                grn
              </Col>
              <Col className="col-item">
                <br />
                <Button variant="primary">
                  Add
                </Button>
              </Col>
            </Row>
          );
        })}
        <hr className="menu-item" />
      </Container>
    );
  }
}

MenuItemDish.propTypes = {
  menuitemdishes: PropTypes.array.isRequired,
};
export default MenuItemDish;
