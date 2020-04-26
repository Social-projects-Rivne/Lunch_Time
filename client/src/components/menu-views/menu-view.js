import React, { Component } from 'react';
import {
  Button, Container, Spinner,
} from 'react-bootstrap';
import Pagination from 'react-bootstrap-pagination-logic';
import PropTypes from 'prop-types';
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
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.addDishToOrderList = this.addDishToOrderList.bind(this);
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
      <MenuItemDish menuitemdishes={menuitemdishes} addDishToOrderList={this.addDishToOrderList} />
    );
  }

  addDishToOrderList(dishCategory, dishName) {
    const previousDishArray = this.state.dishes;
    const dishes = [...previousDishArray];
    const dish = `${dishCategory} ${dishName}, `;
    dishes.push(dish);
    this.setState({
      dishes,
    });
  }

  render() {
    const { isFetching } = this.state;
    if (isFetching) {
      return (
        <Container className="menu">
          <Header />
          {this.initMenuItemDish()}
          {this.initPagination()}
          <div>
            {this.state.dishes.length > 0 && (
            <Button
              className="complete"
              variant="primary"
              style={{
                marginRight: 40,
              }}
            >
              Complete order
              {' ('}
              {this.state.dishes.length}
              )
            </Button>
            )}
          </div>
        </Container>
      );
    }
    return (
      <Spinner animation="border" variant="warning" />
    );
  }
}

Menu.propTypes = {
  id: PropTypes.any.isRequired,
};
export default Menu;
