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
  onDeleteClick(id) {
    Api.delete(`menuitemdish/${id}`)
      .then((r) => {
        if (r.error != null) {
          console.log(r.error);
        }
        this.props.update();
      });
  }

  render() {
    const { menuItemDishes, isAuthenticated, isEdit } = this.props;
    return (
      <Container>
        {menuItemDishes.map((menuItemDish) => {
          return (
            <Row key={menuItemDish.id}>
              <Col>
                <Category category={menuItemDish.dish.categoryFood} />
              </Col>
              <Col>
                <Dish dish={menuItemDish} />
              </Col>
              <Col className="col-item">
                <Image
                  className="image-menu-item"
                  src={`${Api.apiUrl}images/dishes/${menuItemDish.imageUrl}`}
                  roundedCircle
                  width="150"
                  height="75"
                  alt="Dish image"
                />
              </Col>
              <Col className="col-item">
                <br />
                {menuItemDish.portionSize}
              </Col>
              <Col className="col-item">
                <br />
                {menuItemDish.portionPrice}
                {' '}
                {'  '}
                {menuItemDish.currency}
              </Col>
              <Col className="col-item">
                <br />
                {!isEdit ? (
                  <Button variant="primary" disabled={!isAuthenticated}>Add</Button>
                ) : (
                  <Button
                    id={menuItemDish.id}
                    variant="primary"
                    onClick={(e) => this.onDeleteClick(e.target.id)}
                  >
                    Delete
                  </Button>
                )}
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
  menuItemDishes: PropTypes.array.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  isEdit: PropTypes.bool.isRequired,
  update: PropTypes.any.isRequired,
};
export default MenuItemDish;
