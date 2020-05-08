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
      dishes: [],
      menuItemDishesMap: new Map(),
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.addDishToOrderList = this.addDishToOrderList.bind(this);
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
    const { menuItemDishes, isEdit } = this.state;
    const { isAuthenticated } = this.props;
    if (menuItemDishes !== undefined) {
      return (
        <MenuItemDish
          menuItemDishes={menuItemDishes}
          isAuthenticated={isAuthenticated}
          isEdit={isEdit}
          addDishToOrderList={this.addDishToOrderList}
          addMenuItemDishToOrderList={this.addMenuItemDishToOrderList}
          update={() => this.handleChange('menuitemdish/restaurantId?')}
        />
      );
    }
    return null;
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

  handleChange(match) {
    this.setState({
      path: match,
    });
    this.getAll(match, 0, this.state.pageSize);
  }

  render() {
    const { id, isOwner, name } = this.props;
    const { isFetching, dishes, menuItemDishesMap } = this.state;
    if (isFetching) {
      return (
        <Container className="menu mb-4">
          <Header onChange={this.handleChange} isEdit={() => this.onEditMenu()} id={id} isOwner={isOwner} />
          {this.initMenuItemDish()}
          {this.initPagination()}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
          >
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
                >
                  Complete order (
                  {this.state.dishes.length}
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
