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

  onDeleteClick(id) {
    Api.delete(`menuitemdish/${id}`)
      .then((r) => {
        if (r.error != null) {
          console.log(r.error);
        }
        this.props.update();
      });
  }

  getImage(menuItemDish) {
    if (menuItemDish && menuItemDish.imageUrl && menuItemDish.imageUrl.length) {
      return `${Api.apiUrl}images/dishes/${menuItemDish.imageUrl}`;
    }
    return '/img/dish-default.png';
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
                  src={this.getImage(menuItemDish)}
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
  addDishToOrderList: PropTypes.func.isRequired,
  addMenuItemDishToOrderList: PropTypes.func.isRequired,
  menuItemDishes: PropTypes.array.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  isEdit: PropTypes.bool.isRequired,
  update: PropTypes.any.isRequired,
};
export default MenuItemDish;
