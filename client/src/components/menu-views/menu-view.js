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
      path: 'menuitemdish/restaurantId?',
      isFetching: false,
      isEdit: false,
    };
    this.handlePageChange = this.handlePageChange.bind(this);
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
          update={() => this.componentDidMount()}
        />
      );
    }
    return null;
  }

  handleChange(match) {
    this.setState({
      path: match,
    });
    this.getAll(match, 0, this.state.pageSize);
  }

  render() {
    const { isFetching } = this.state;
    const { id } = this.props;
    if (isFetching) {
      return (
        <Container className="menu">
          <Header onChange={this.handleChange} isEdit={() => this.onEditMenu()} id={id} />
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
  isAuthenticated: PropTypes.bool.isRequired,
};
export default Menu;
