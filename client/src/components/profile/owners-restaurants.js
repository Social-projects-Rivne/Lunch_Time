import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';

class OwnersRestaurants extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     totalPages: 0,
  //     number: 0,
  //     pageSize: 9,
  //     restaurants: [],
  //     isFetching: false,
  //   };
  //   this.handlePageChange = this.handlePageChange.bind(this);
  // }
  //
  // componentDidMount() {
  //   const { userId } = this.props;
  //   this.getAll(userId, this.state.number, this.state.pageSize);
  // }
  //
  // getAll(userId, page, pageSize) {
  //   Api.get(`restaurants?userId=${userId}&page=${page}&size=${pageSize}`)
  //     .then((response) => {
  //       if (response.error) {
  //         // eslint-disable-next-line no-console
  //         console.error(response);
  //         return;
  //       }
  //       this.initState(response);
  //     });
  // }


  render() {
    const { userId } = this.props;
    // if (isFetching) {
    // eslint-disable-next-line no-console
    console.log(`user: ${userId}`);
    return (
      <Container fluid>
        My Restaurants
      </Container>
    );
    //   }
    //   return (
    //     <Spinner animation="border" variant="warning" />
    //   );
  }
}

OwnersRestaurants.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default OwnersRestaurants;
