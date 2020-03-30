import React, { Component } from 'react';
import { Container, Row, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Dish from './dish';


class MenuItemDish extends Component {
  render() {
    const { menuitemdish, isFetching } = this.props;
    return (
      <Container>
        {menuitemdish.map((menuitemdishs) => {
          return (
            <Row key={menuitemdishs.id}>
              <Image variant="top" src={menuitemdishs.imageUrl} alt="Dish Image" />
              <Dish dish={menuitemdishs} isFetching={isFetching} />
              <span>
                Portion size:
                {menuitemdishs.portionSize}
              </span>
              <span>
                Portion price:
                {menuitemdishs.portionPrice}
              </span>
            </Row>
          );
        })}
      </Container>
    );
  }
}

MenuItemDish.propTypes = {
  menuitemdish: PropTypes.any.isRequired,
  isFetching: PropTypes.any.isRequired,
};
export default MenuItemDish;
