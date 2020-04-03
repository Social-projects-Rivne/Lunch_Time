import React, { Component } from 'react';
import {
  Container, Button, Row, Col, Spinner,
} from 'react-bootstrap';
import Avatar from 'react-avatar';
import PropTypes from 'prop-types';
import '../../styles/profile-info.css';
import AlertBase from '../shared/alert-base';
import InfoChange from './info-change';

class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowAlert: false,
      isEditProfile: false,
      user: this.props.user,
    };
  }

  showEditForm(isShowEdit, isShowAlert) {
    this.setState({
      isEditProfile: isShowEdit,
      isShowAlert: isShowAlert,
    });
  }

  render() {
    const { isFetching } = this.props;
    const { isShowAlert, isEditProfile, user } = this.state;
    if (isFetching && !isEditProfile) {
      return (
        <Container fluid>
          {isShowAlert ? (
            <AlertBase
              type="success"
              title="Your profile was successfully updated"
            />
          ) : ('')}
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
              <Avatar name={user.name} size="150" round src={user.avatarUrl} />
            </Col>
          </Row>

          <hr className="hr-border" />
          <Button className="btn-inf m-button ml-3">Add restaurant</Button>
          <hr className="hr-border" />
          <Button
            onClick={() => this.showEditForm(true, false)}
            className="btn-inf m-button ml-3"
          >
            Update profile
          </Button>
          <Button className="btn-inf ml-3" variant="danger">Remove account</Button>
        </Container>
      );
    }
    if (isEditProfile) {
      return (
        <InfoChange
          onChangeData={() => this.showEditForm(false, true)}
          updateUser={(updatedUser) => this.setState({ user: updatedUser })}
          user={user}
        />
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
};

export default Info;
