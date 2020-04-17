import React, { Component } from 'react';
import { Container, Spinner } from 'react-bootstrap';
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
      menuItemDishes: [],
      isFetching: false,
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidMount() {
    this.getAll(this.state.number, this.state.pageSize);
  }

  getAll(page, pageSize) {
    const { id } = this.props;
    Api.getAll(`menuitemdish/restaurantId?restaurantId=${id}
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
          menuItemDishes: response.data.content,
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
    const { menuItemDishes } = this.state;
    return (
      <MenuItemDish menuItemDishes={menuItemDishes} />
    );
  }

  render() {
    const { isFetching } = this.state;
    if (isFetching) {
      return (
        <Container className="menu">
          <Header />
          {this.initMenuItemDish()}
          {this.initPagination()}
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
