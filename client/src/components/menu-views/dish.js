import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Api from '../../services/api';


class Dish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryfood: {},
    };
  }

  async componentDidMount() {
    const { dish, isFetching } = this.props;
    if (isFetching) {
      this.getOne(dish.categoryfoodId);
    }
  }

  getCategoryFood(id) {
    Api.getOne('category', id)
      .then((response) => {
        if (response.error) {
          // eslint-disable-next-line no-console
          console.error(response);
          return;
        }
        this.setState({
          categoryfood: response.data,
        });
      });
  }

  render() {
    const { dish } = this.props.dish;
    const { categoryfood } = this.state;
    return (
      <Container>
        <Container className="category-food">
          <h3>
            <span>{categoryfood.name}</span>
          </h3>
        </Container>
        <Container className="dish">
          <Row>
            <span>{dish.name}</span>
            <span>{ dish.ingredients}</span>
          </Row>
        </Container>
      </Container>
    );
  }
}

Dish.propTypes = {
  dish: PropTypes.shape([]).isRequired,
  isFetching: PropTypes.bool.isRequired,
};


export default Dish;
