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
      menuitemdishes: [],
      isFetching: false,
      dishes: [],
      menuItemDishesMap: new Map(),
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.addDishToOrderList = this.addDishToOrderList.bind(this);
    this.addMenuItemDishToOrderList = this.addMenuItemDishToOrderList.bind(this);
  }

  componentDidMount() {
    this.getAll(this.state.number, this.state.pageSize);
  }

  getAll(page, pageSize) {
    const { id } = this.props;
    Api.get(`menuitemdish/restaurantId?restaurantId=${id}
                &page=${page}&size=${pageSize}`)
      .then((response) => {
        if (response.error) {
          // eslint-disable-next-line no-console
          console.error(response);
          return;
        }
        this.setState({
          totalPages: response.data.totalPages,
          number: response.data.number,
          menuitemdishes: response.data.content,
          isFetching: true,
        });
      });
  }

  handlePageChange(page) {
    this.getAll(page - 1, this.state.pageSize);
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
    const { menuitemdishes } = this.state;
    return (
      <MenuItemDish
        menuitemdishes={menuitemdishes}
        addDishToOrderList={this.addDishToOrderList}
        addMenuItemDishToOrderList={this.addMenuItemDishToOrderList}
      />
    );
  }

  addDishToOrderList(dishCategory, dishName) {
    const previousDishArray = this.state.dishes;
    const dishes = [...previousDishArray];
    const dish = ` ${dishCategory} ${dishName}`;
    dishes.push(dish);
    this.setState({
      dishes,
    });
  }

  addMenuItemDishToOrderList(newMenuItemDish) {
    const { menuItemDishesMap } = this.state;
    let quantity = 1;
    if (menuItemDishesMap.has(newMenuItemDish)) {
      quantity = menuItemDishesMap.get(newMenuItemDish) + 1;
    }
    menuItemDishesMap.set(newMenuItemDish, quantity);
    this.setState({
      menuItemDishesMap,
    });
  }

  render() {
    const { id, name } = this.props;
    const { isFetching, dishes, menuItemDishesMap } = this.state;
    if (isFetching) {
      return (
        <Container className="menu">
          <Header />
          {this.initMenuItemDish()}
          {this.initPagination()}
          <Link to={{
            pathname: `/restaurants/${id}/new-order`,
            state: {
              restaurantName: name,
              dishes: dishes,
              menuItemDishesMap: menuItemDishesMap,
            },
          }}
          >
            {this.state.dishes.length > 0 && (
              <Button
                className="complete"
                variant="primary"
                style={{
                  marginRight: 40,
                }}
              >
                Complete order (
                {this.state.dishes.length}
                {' '}
                {' '}
                items)
              </Button>
            )}
          </Link>
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
};
export default Menu;
