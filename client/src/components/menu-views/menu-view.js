import React, { Component } from 'react';
import {
  Button, Container, Spinner,
} from 'react-bootstrap';
import Pagination from 'react-bootstrap-pagination-logic';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from './menu-header';
import MenuItemDish from './menu-item-dish';
import Api from '../../services/api';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPages: 0,
      number: 0,
      pageSize: 2,
      menuItemDishes: [],
      path: 'menuitemdish/restaurantId?',
      isFetching: false,
      isEdit: false,
      menuItemDishesMap: new Map(),
      orderedDishes: [],
      totalPrice: 0,
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.addMenuItemDishToOrderList = this.addMenuItemDishToOrderList.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getAll(this.state.path, this.state.number, this.state.pageSize);
  }

  onEditMenu() {
    this.setState((currentState) => ({ isEdit: !currentState.isEdit }));
  }

  getAll(path, page, pageSize) {
    const { id } = this.props;
    Api.get(`${path}page=${page}&size=${pageSize}&restaurantId=${id}`)
      .then((response) => {
        if (response.error) {
          // eslint-disable-next-line no-console
          console.error(response);
          return;
        }
        this.setState({
          totalPages: response.data.totalPages,
          number: response.data.number,
          menuItemDishes: response.data.content,
          isFetching: true,
        });
      });
  }

  handlePageChange(page) {
    this.getAll(this.state.path, page - 1, this.state.pageSize);
  }

  initPagination() {
    const { number, totalPages, menuItemDishes } = this.state;
    if (totalPages === 1 || menuItemDishes === undefined) {
      return null;
    }
    return (
      <Pagination
        current_page={number + 1}
        last_page={totalPages}
        position="center"
        handlePageChange={this.handlePageChange}
      />

    );
  }

  initMenuItemDish() {
    const { menuItemDishes, menuItemDishesMap, isEdit } = this.state;
    const { isAuthenticated } = this.props;
    if (menuItemDishes !== undefined) {
      return (
        <MenuItemDish
          menuItemDishes={menuItemDishes}
          isAuthenticated={isAuthenticated}
          isEdit={isEdit}
          addDishToOrderList={this.addDishToOrderList}
          addMenuItemDishToOrderList={this.addMenuItemDishToOrderList}
          menuItemDishesMap={menuItemDishesMap}
          update={() => this.handleChange('menuitemdish/restaurantId?')}
          mainMenu
        />
      );
    }
    return null;
  }

  addMenuItemDishToOrderList(newMenuItemDish, value) {
    const { menuItemDishesMap, totalPrice } = this.state;
    let quantity = 1;
    let total;
    if (menuItemDishesMap.get(newMenuItemDish.id) > 0) {
      if (value === '+') {
        quantity = menuItemDishesMap.get(newMenuItemDish.id) + 1;
        total = newMenuItemDish.portionPrice + totalPrice;
      } else if (value === '-') {
        quantity = menuItemDishesMap.get(newMenuItemDish.id) - 1;
        total = totalPrice - newMenuItemDish.portionPrice;
      }
    } else {
      total = newMenuItemDish.portionPrice + totalPrice;
    }
    if (quantity !== 0) {
      menuItemDishesMap.set(newMenuItemDish.id, quantity);
    } else {
      menuItemDishesMap.delete(newMenuItemDish.id);
    }
    this.setState({
      menuItemDishesMap,
      totalPrice: total,
    }, () => {
      this.newSet(newMenuItemDish);
    });
  }

  newSet(newMenuItemDish) {
    this.setState((prevState) => {
      return {
        orderedDishes: [...prevState.orderedDishes, newMenuItemDish],
      };
    });
  }

  handleChange(match) {
    this.setState({
      path: match,
    });
    this.getAll(match, 0, this.state.pageSize);
  }

  render() {
    const {
      id, name, isOwner, isAuthenticated,
    } = this.props;
    const {
      isFetching, menuItemDishesMap, totalPrice, orderedDishes,
    } = this.state;
    if (isFetching) {
      return (
        <Container className="menu mb-4">
          <Header onChange={this.handleChange} isEdit={() => this.onEditMenu()} id={id} isOwner={isOwner} mainMenu />
          {this.initMenuItemDish()}
          {this.initPagination()}
          {totalPrice > 0 && (
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              fontSize: 20,
              marginRight: 10,
            }}
            >
              <b>
                TOTAL
                {' '}
                price:
                {' '}
                {totalPrice}
                {' '}
                UAH
              </b>
            </div>
          )}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginRight: 5,
          }}
          >
            <Link to={{
              pathname: `/restaurants/${id}/new-order`,
              state: {
                restaurantName: name,
                menuItemDishesMap: menuItemDishesMap,
                orderedDishes: orderedDishes,
                isAuthenticated: isAuthenticated,
                totalPrice: totalPrice,
              },
            }}
            >
              {menuItemDishesMap.size > 0 && (
                <Button
                  className="complete"
                  variant="primary"
                >
                  Complete order (
                  {menuItemDishesMap.size}
                  {' '}
                  items)
                </Button>
              )}
            </Link>
          </div>
        </Container>
      );
    }
    return (
      <Spinner animation="border" variant="warning" />
    );
  }
}

Menu.defaultProps = {
  name: 'selected restaurant',
};

Menu.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  isAuthenticated: PropTypes.bool.isRequired,
  isOwner: PropTypes.bool.isRequired,
};
export default Menu;
