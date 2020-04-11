import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';
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
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  async componentDidMount() {
    this.getAll(this.state.number, this.state.pageSize);
  }

  getAll(page, pageSize) {
    const { id } = this.props;
    Api.getAll(`menuitemdish?restaurantId=${id}&page=${page}&size=${pageSize}`)
      .then((response) => {
        if (response.error) {
          console.error(response);
          return;
        }
        this.setState({
          totalPages: response.data.totalPages,
          number: response.data.number,
          menuitemdishes: response.data,
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

  render() {
    const { menuitemdishes, isFetching } = this.state;
    return (
      <Container fluid className="menu">
        <Header />
        <Row>
          <MenuItemDish menuitemdish={menuitemdishes} isFetching={isFetching} />
          {this.initPagination}
        </Row>
      </Container>
    );
  }
}

Menu.propTypes = {
  id: PropTypes.any.isRequired,
};
export default Menu;
