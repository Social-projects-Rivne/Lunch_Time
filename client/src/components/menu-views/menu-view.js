import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Header from './menu-header';
import MenuItemDish from './menu-item-dish';
import Api from '../../services/api';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuitemdishes: [],
      isFetching: false,
    };
  }

  async componentDidMount() {
    this.getAllMenuItemDishes();
  }

  getAllMenuItemDishes() {
    const { id } = this.props;
    Api.getAllMenuItemDishes('menuitemdish/restaurantId?restaurantId=', id)
      .then((response) => {
        if (response.error) {
          console.error(response);
          return;
        }
        this.setState({
          menuitemdishes: response.data,
          isFetching: true,
        });
      });
  }

  render() {
    const { menuitemdishes, isFetching } = this.state;
    return (
      <Container fluid className="menu">
        <Header />
        <Row>
          <MenuItemDish menuitemdish={menuitemdishes} isFetching={isFetching} />
        </Row>
      </Container>
    );
  }
}

Menu.propTypes = {
  id: PropTypes.any.isRequired,
};
export default Menu;
