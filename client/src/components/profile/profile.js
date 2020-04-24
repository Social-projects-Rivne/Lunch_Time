import React, { Component } from 'react';
import {
  Container, ListGroup, Row, Col,
} from 'react-bootstrap';
import {
  Link, Switch, Route, Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import Info from './info';
import History from './history';
import Orders from './orders';
import Settings from './settings';
import Sharing from './sharing';
import Subscriptions from './subscriptions';
import Api from '../../services/api';
import '../../styles/profile.css';
import PhotoEditor from '../shared/photo-editor';
import InfoChange from './info-change';
import Auth from '../../services/auth';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.token = '';
    this.state = {
      user: {},
      isFetching: false,
      isShowAlert: false,
    };
    this.menuItems = [
      { path: '/profile/info', title: 'Info' },
      { path: '/profile/owners-restaurants', title: 'My Restaurants' },
      { path: '/profile/orders', title: 'Orders' },
      { path: '/profile/history', title: 'History' },
      { path: '/profile/subscriptions', title: 'Subscriptions' },
      { path: '/profile/sharing', title: 'Sharing' },
      { path: '/profile/settings', title: 'Settings' },
    ];
  }

  async componentDidMount() {
    this.getProfile();
  }

  getProfile() {
    if (Auth.isAuthenticated) { this.token = Auth.getToken(); }
    Api.getCurrentUser('persons/currentUser', this.token)
      .then((response) => {
        if (response.error) {
          // eslint-disable-next-line no-console
          console.error(response);
          return;
        }
        this.setState({
          user: response.data,
          isFetching: true,
        });
      });
  }

  saveAlertState(show) {
    const { isShowAlert } = this.state;
    if (isShowAlert !== show) {
      this.setState({
        isShowAlert: show,
      });
    }
  }

  render() {
    const { isFetching, user, isShowAlert } = this.state;
    const { location } = this.props;
    return (
      <Container fluid>
        <Container fluid className="page-header">
          <h1 className="page-header-title">
            Profile
          </h1>
        </Container>
        <Container className="card-body pl-5 pr-5">
          <Row>
            <Col md="3" className="profile-menu">
              <ListGroup>
                {this.menuItems.map((menuItem, index) => {
                  return (
                    // eslint-disable-next-line react/no-array-index-key
                    <Link to={menuItem.path} key={index}>
                      <ListGroup.Item active={location.pathname === menuItem.path}>
                        {menuItem.title}
                      </ListGroup.Item>
                    </Link>
                  );
                })}
              </ListGroup>
            </Col>
            <Col>
              <Switch>
                <Redirect exact from="/profile" to="/profile/info" />
                <Route
                  path="/profile/info"
                  component={() => {
                    return (
                      <Info
                        isFetching={isFetching}
                        user={user}
                        isShowAlert={isShowAlert}
                        showAlert={(e) => this.saveAlertState(e)}
                      />
                    );
                  }}
                />
                <Route
                  path="/profile/edit"
                  component={() => {
                    return (
                      <InfoChange
                        user={user}
                        updateUser={(updatedUser) => this.setState({ user: updatedUser, isShowAlert: true })}
                      />
                    );
                  }}
                />
                <Route path="/profile/avatar" component={PhotoEditor} />
                <Route path="/profile/orders" component={Orders} />
                <Route path="/profile/history" component={History} />
                <Route path="/profile/subscriptions" component={Subscriptions} />
                <Route path="/profile/sharing" component={Sharing} />
                <Route path="/profile/settings" component={Settings} />
              </Switch>
            </Col>
          </Row>
        </Container>

      </Container>
    );
  }
}

Profile.propTypes = {
  location: PropTypes.any.isRequired,
};

export default Profile;
