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
      dishCategory: '',
      dishName: '',
      menuItemDish: '',
    };
  }

  addDishToOrderList() {
    const { dishCategory, dishName } = this.state;
    this.props.addDishToOrderList(dishCategory, dishName);
  }

  sendDishToOrderList(dishCategory, dishName) {
    this.setState({
      dishCategory: dishCategory,
      dishName: dishName,
    }, () => {
      this.addDishToOrderList();
    });
  }

  addMenuItemDishToOrderList() {
    const { menuItemDish } = this.state;
    this.props.addMenuItemDishToOrderList(menuItemDish);
  }

  sendMenuItemDishToOrderList(newMenuItemDish) {
    const menuItemDish = newMenuItemDish;
    this.setState({
      menuItemDish,
    }, () => {
      this.addMenuItemDishToOrderList();
    });
  }

  render() {
    const { menuItemDishes, isAuthenticated } = this.props;
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
                <Button
                  variant="primary"
                  disabled={!isAuthenticated}
                  onClick={() => {
                    this.sendDishToOrderList(menuItemDish.dish.categoryFood.name, menuItemDish.dish.name);
                    this.sendMenuItemDishToOrderList(menuItemDish.id);
                  }}
                >
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
  addDishToOrderList: PropTypes.func.isRequired,
  addMenuItemDishToOrderList: PropTypes.func.isRequired,
  menuItemDishes: PropTypes.array.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};
export default MenuItemDish;
