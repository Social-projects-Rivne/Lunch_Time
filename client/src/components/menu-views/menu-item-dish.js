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
    };
  }

  addDishToOrder() {
    const { dishCategory, dishName } = this.state;
    this.props.addDishToOrder(dishCategory, dishName);
  }

  sendDishToOrder(dichCategory, dishName) {
    this.setState({
      dishCategory: dichCategory,
      dishName: dishName,
    }, () => {
      this.addDishToOrder();
    });
  }

  render() {
    const { menuitemdishes } = this.props;
    return (
      <Container>
        {menuitemdishes.map((menuitemdish) => {
          return (
            <Row key={menuitemdish.id}>
              <Col>
                <Category category={menuitemdish.dish.categoryfood} />
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
                <Button
                  variant="primary"
                  onClick={() => { this.sendDishToOrder(menuitemdish.dish.categoryfood.name, menuitemdish.dish.name); }}
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
  menuitemdishes: PropTypes.array.isRequired,
  addDishToOrder: PropTypes.func.isRequired,
};
export default MenuItemDish;
