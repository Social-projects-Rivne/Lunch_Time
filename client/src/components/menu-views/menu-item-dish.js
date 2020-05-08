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
  constructor(props) {
    super(props);
    this.state = {
      menuItemDish: '',
    };
  }

  addMenuItemDishToOrderList() {
    const { menuItemDish, value, portionPrice } = this.state;
    this.props.addMenuItemDishToOrderList(menuItemDish, portionPrice, value);
  }

  sendMenuItemDishToOrderList(newMenuItemDish, portionPrice, value) {
    const menuItemDish = newMenuItemDish;
    this.setState({
      menuItemDish,
      value,
      portionPrice,
    }, () => {
      this.addMenuItemDishToOrderList();
    });
  }

  render() {
    const { menuItemDishes, isAuthenticated, menuItemDishesMap } = this.props;
    return (
      <Container>
        {menuItemDishes.map((menuItemDish) => {
          const quantity = menuItemDishesMap.get(menuItemDish.id);
          const addMessage = quantity ? 'Q:' : 'Add';
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
                {quantity > 0 && (
                <button
                  style={{ marginRight: 2 }}
                  type="button"
                  className="btn btn-danger"
                  id="minus"
                  onClick={() => {
                    this.sendMenuItemDishToOrderList(menuItemDish.id, menuItemDish.portionPrice, '-');
                  }}
                >
                  -
                </button>
                )}
                <Button
                  variant="primary"
                  disabled={!isAuthenticated || quantity > 0}
                  onClick={() => {
                    this.sendMenuItemDishToOrderList(menuItemDish.id, menuItemDish.portionPrice);
                  }}
                >
                  {addMessage}
                  {' '}
                  {quantity > 0 ? quantity : ''}
                </Button>
                {quantity > 0
                && (
                <button
                  style={{ marginLeft: 2 }}
                  type="button"
                  className="btn btn-success"
                  id="plus"
                  onClick={() => {
                    this.sendMenuItemDishToOrderList(menuItemDish.id, menuItemDish.portionPrice, '+');
                  }}
                >
                  +
                </button>
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
  addMenuItemDishToOrderList: PropTypes.func.isRequired,
  menuItemDishes: PropTypes.array.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  menuItemDishesMap: PropTypes.any.isRequired,
};
export default MenuItemDish;
