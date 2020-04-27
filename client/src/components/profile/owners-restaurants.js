import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Api from '../../services/api';

class OwnersRestaurants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.userId,
      number: 0,
      pageSize: 5,
    };
  }

  componentDidMount() {
    this.getAll(this.state.userId, this.state.number, this.state.pageSize);
  }

  getAll(userId, page, pageSize) {
    Api.get(`restaurants/userId?userId=${userId}&page=${page}&size=${pageSize}`)
      .then((response) => {
        if (response.error) {
          // eslint-disable-next-line no-console
          console.error(response);
          return;
        }
        this.initState(response);
      });
  }

  initState(response) {
    this.setState({
      number: response.data.number,
    });
  }

  render() {
    return (
      <Container fluid>
        My Restaurants
      </Container>
    );
  }
}

OwnersRestaurants.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default OwnersRestaurants;
