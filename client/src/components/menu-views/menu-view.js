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
    const { restaurant } = this.props.restaurant;
    Api.getAllMenuItemDishes('menuitemdish?restaurantId=', restaurant.id)
      .then((response) => {
        if (response.error) {
        // eslint-disable-next-line no-console
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
    const { restaurant } = this.props.restaurant;
    const { menuitemdishes, isFetching } = this.state;
    return (

      <Container fluid className="menu">
        <Header restaurant={restaurant} />
        <MenuItemDish menuitemdish={menuitemdishes} isFetching={isFetching} />
        <Container>
          <Row>
            Pizza salami.
            Ingredients: pizza sousse, salami, sold, pfeffer
          </Row>
        </Container>
      </Container>

    );
  }
}
Menu.propTypes = {
  restaurant: PropTypes.any.isRequired,
};
export default Menu;
