import React, { Component } from 'react';
import {
  Container, Row, Image, Col,
  Spinner, Button, Form,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import Dish from './dish';
import Category from './category';
import Api from '../../services/api';


class MenuItemDish extends Component {
  render() {
    const { menuitemdish, isFetching } = this.props;

    if (isFetching) {
      return (
        <Container>
          {menuitemdish.map((menuitemdishs) => {
            return (
              <Row key={menuitemdishs.id}>
                <Col>
                  <Category category={menuitemdishs.dish.categoryfood} />
                </Col>
                <Col>
                  <Dish dish={menuitemdishs} />
                </Col>
                <Col className="col-item">
                  <Image
                    className="image-menu-item"
                    src={`${Api.apiUrl}images/dishes/${menuitemdishs.imageUrl}`}
                    roundedCircle
                    width="150"
                    height="75"
                    alt="Dish image"
                  />
                </Col>
                <Col className="col-item">
                  <br />
                  {menuitemdishs.portionSize}
                </Col>
                <Col className="col-item">
                  <br />
                  {menuitemdishs.portionPrice}
                  {' '}
                  {'  '}
                  grn
                </Col>
                <Col className="col-item">
                  <br />
                  <Form.Check type="checkbox" />
                </Col>
              </Row>
            );
          })}
          <hr className="menu-item" />
          <Button variant="primary" type="submit" block>
            Make order
          </Button>
        </Container>
      );
    }
    return (
      <Spinner animation="border" variant="warning" />
    );
  }
}

MenuItemDish.propTypes = {
  menuitemdish: PropTypes.shape([]).isRequired,
  isFetching: PropTypes.bool.isRequired,
};
export default MenuItemDish;
