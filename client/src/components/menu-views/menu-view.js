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
    const { number, totalPages } = this.state;
    if (totalPages === 1) {
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
    const { menuItemDishes, menuItemDishesMap } = this.state;
    const { isAuthenticated } = this.props;
    return (
      <MenuItemDish
        menuItemDishes={menuItemDishes}
        isAuthenticated={isAuthenticated}
        addMenuItemDishToOrderList={this.addMenuItemDishToOrderList}
        menuItemDishesMap={menuItemDishesMap}
        mainMenu
      />
    );
  }

  addMenuItemDishToOrderList(newMenuItemDish, value) {
    const { menuItemDishesMap } = this.state;
    let quantity = 1;
    if (value === '+') {
      quantity = menuItemDishesMap.get(newMenuItemDish.id) + 1;
    } else if (value === '-') {
      quantity = menuItemDishesMap.get(newMenuItemDish.id) - 1;
    }
    menuItemDishesMap.set(newMenuItemDish.id, quantity);
    this.setState({
      menuItemDishesMap,
    }, () => {
      this.newSet(newMenuItemDish);
    });
  }

  newSet(newMenuItemDish) {
    this.setState((prevState) => {
      return {
        totalPrice: prevState.totalPrice + newMenuItemDish.portionPrice,
        orderedDishes: [...prevState.orderedDishes, newMenuItemDish],
      };
    });
    console.log(this.state.orderedDishes);
  }

  handleChange(match) {
    this.setState({
      path: match,
    });
    this.getAll(match, 0, this.state.pageSize);
  }

  render() {
    const { id, name } = this.props;
    const {
      isFetching, menuItemDishesMap, totalPrice, orderedDishes,
    } = this.state;
    console.log(orderedDishes);
    if (isFetching) {
      return (
        <Container className="menu">
          <Header onChange={this.handleChange} mainMenu />
          {this.initMenuItemDish()}
          {this.initPagination()}
          {menuItemDishesMap.size > 0 && (
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              fontSize: 22,
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
};
export default Menu;
