import React, { Component } from 'react';
import {
  Container, Button, Row, Col, Spinner,
} from 'react-bootstrap';
import Avatar from 'react-avatar';
import PropTypes from 'prop-types';
import '../../styles/profile-info.css';
import { Link } from 'react-router-dom';

class Info extends Component {
  render() {
    const {
      isFetching, user, avatar,
    } = this.props;
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
                { user.phoneNumber }
              </p>
            </Col>
            <Col>
              <Avatar size="150" round src={avatar} />
            </Col>
          </Row>

          <hr className="hr-border" />
          <Link to="/restaurants/restaurant-register">
            <Button className="btn-inf ml-3">Add restaurant</Button>
          </Link>
          <hr className="hr-border" />
          <Link to="edit">
            <Button
              className="btn-inf ml-3"
            >
              Update profile
            </Button>
          </Link>
          <Button className="btn-inf ml-3" variant="danger">Remove account</Button>
        </Container>
      );
    }
    return (
      <Spinner animation="border" variant="warning" />
    );
  }
}

Info.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  user: PropTypes.any.isRequired,
  avatar: PropTypes.string.isRequired,
};

export default Info;
