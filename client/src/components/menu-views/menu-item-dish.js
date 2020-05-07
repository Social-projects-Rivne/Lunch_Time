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
      // counter: 0,
    };
  }

  // increment() {
  //   this.setState((prevState) => ({
  //     counter: this.state.counter + 1,
  //   }));
  // }
  //
  // decrement() {
  //   if (this.state.counter > 0) {
  //     this.setState((prevState) => ({
  //       counter: this.state.counter - 1,
  //     }));
  //   }
  // }

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
                <button
                  style={{ marginRight: 5 }}
                  type="button"
                  className="btn btn-danger"
                  id="minus"
                  // onClick={this.decrement.bind(this)}
                >
                  -
                </button>
                <Button
                  variant="primary"
                  disabled={!isAuthenticated}
                  onClick={() => {
                    this.sendMenuItemDishToOrderList(menuItemDish.id);
                  }}
                >
                  Add
                </Button>
                <button
                  style={{ marginLeft: 5 }}
                  type="button"
                  className="btn btn-success"
                  id="plus"
                  // onClick={this.increment.bind(this)}
                >
                  +
                </button>
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
};
export default MenuItemDish;
