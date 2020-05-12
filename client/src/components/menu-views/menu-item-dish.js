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

  onDeleteClick(id) {
    Api.delete(`menuitemdish/${id}`)
      .then((r) => {
        if (r.error != null) {
          // eslint-disable-next-line no-console
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

  addMenuItemDishToOrderList() {
    const { menuItemDish, value } = this.state;
    this.props.addMenuItemDishToOrderList(menuItemDish, value);
  }

  sendMenuItemDishToOrderList(menuItemDish, value) {
    this.setState({
      menuItemDish,
      value,
    }, () => {
      this.addMenuItemDishToOrderList();
    });
  }

  render() {
    const {
      menuItemDishes, isAuthenticated, isEdit, menuItemDishesMap, mainMenu,
    } = this.props;
    return (
      <Container>
        {menuItemDishes.map((menuItemDish) => {
          const quantity = menuItemDishesMap.get(menuItemDish.id);
          const addMessage = quantity ? 'Q:' : 'Add';
          return (
            <Row key={menuItemDish.id}>
              <Col xs={2}>
                <Category category={menuItemDish.dish.categoryFood} />
              </Col>
              <Col xs={3}>
                <br />
                <Dish dish={menuItemDish} mainMenu={mainMenu} />
              </Col>
              {mainMenu && (
              <Col xs={2}>
                <Image
                  className="image-menu-item"
                  src={this.getImage(menuItemDish)}
                  roundedCircle
                  width="160"
                  height="120"
                  alt="Dish image"
                />
              </Col>
              )}
              {mainMenu && (
                <Col className="col-item" xs={1}>
                  <br />
                  {menuItemDish.portionSize}
                </Col>
              )}
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
                  style={{
                    marginRight: 8,
                    width: 35,
                    height: 35,
                    borderRadius: 100,
                  }}
                  type="button"
                  className="btn btn-danger"
                  onClick={() => {
                    this.sendMenuItemDishToOrderList(menuItemDish, '-');
                  }}
                >
                  -
                </button>
                )}
                {!isEdit ? (
                  <Button
                    variant="primary"
                    disabled={!isAuthenticated}
                    onClick={() => {
                      if (quantity === undefined || quantity === 0) {
                        this.sendMenuItemDishToOrderList(menuItemDish);
                      }
                    }}
                  >
                    {addMessage}
                    {' '}
                    {quantity > 0 ? quantity : ''}
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
                {quantity > 0
                && (
                  <button
                    style={{
                      marginLeft: 8,
                      width: 35,
                      height: 35,
                      borderRadius: 100,
                    }}
                    type="button"
                    className="btn btn-success"
                    onClick={() => {
                      this.sendMenuItemDishToOrderList(menuItemDish, '+');
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

MenuItemDish.defaultProps = {
  addMenuItemDishToOrderList: null,
  // isAuthenticated: false,
  mainMenu: false,
};

MenuItemDish.propTypes = {
  addMenuItemDishToOrderList: PropTypes.func,
  menuItemDishes: PropTypes.array.isRequired,
  // isAuthenticated: PropTypes.bool,
  menuItemDishesMap: PropTypes.any.isRequired,
  mainMenu: PropTypes.bool,
  isAuthenticated: PropTypes.bool.isRequired,
  isEdit: PropTypes.bool.isRequired,
  update: PropTypes.any.isRequired,
};
export default MenuItemDish;
