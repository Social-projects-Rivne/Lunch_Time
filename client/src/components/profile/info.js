import React, { Component } from 'react';
import {
  Container, Button, Row, Col,
} from 'react-bootstrap';
import Avatar from 'react-avatar';
import PropTypes from 'prop-types';
import '../../style/profile-info.css';

class Info extends Component {
  render() {
    const { isFetching, user } = this.props;
    if (isFetching) {
      return (
        <Container fluid>
          <Row className="profile-row">
            <Col md="6">
              <p>
                Name:
                {' '}
                { user.name }
              </p>
              <p>
                Email:
                {' '}
                { user.email }
              </p>
              <p>
                Phone:
                {' '}
                { user.phone }
              </p>
            </Col>
            <Col>
              <Avatar name={user.name} size="150" round />
            </Col>
          </Row>

          <hr className="hr-border" />
          <Button className="m-button ml-5">Add restaurant</Button>
          <hr className="hr-border" />
          <Button className="ml-5" variant="danger">Remove account</Button>
        </Container>
      );
    }
    return (
      <h2>Loading...</h2>
    );
  }
}

Info.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  user: PropTypes.any.isRequired,
};

export default Info;
