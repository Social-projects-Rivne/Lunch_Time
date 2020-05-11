import React, { Component } from 'react';
import {
  Container, ListGroup, Row, Col, Alert,
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
import PhotoEditor from './avatar';
import Auth from '../../services/auth';
import OwnersRestaurants from './owners-restaurants';
import { OWNER_ROLE_ID } from '../../constants';
import ProfileEdit from './profile-edit';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.token = '';
    this.defaultAlertVariant = 'success';
    this.state = {
      user: {},
      isFetching: false,
      avatar: '',
      isShowAlert: false,
      alertMessage: '',
      alertVariant: this.defaultAlertVariant,
    };
    this.menuItems = [
      {
        path: '/profile/info', title: 'Info', ownerSee: true, userSee: true,
      },
      {
        path: '/profile/owners-restaurants', title: 'My Restaurants', ownerSee: true, userSee: false,
      },
      {
        path: '/profile/orders', title: 'Orders', ownerSee: true, userSee: true,
      },
      {
        path: '/profile/history', title: 'History', ownerSee: true, userSee: true,
      },
      {
        path: '/profile/subscriptions', title: 'Subscriptions', ownerSee: true, userSee: true,
      },
      {
        path: '/profile/sharing', title: 'Sharing', ownerSee: true, userSee: true,
      },
      {
        path: '/profile/settings', title: 'Settings', ownerSee: true, userSee: true,
      },
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
        this.getAvatarUrl(response.data);
      });
  }

  getAvatarUrl(user) {
    if (user.photoUrl === undefined || user.photoUrl === null) {
      this.saveAvatarState('/img/default-avatar.png');
    } else {
      Api.getImage(`image/profile/${user.id}`)
        .then((response) => {
          if (response.error == null) {
            this.saveAvatarState(`data:image/jpg;base64,${response.data}`);
          }
        });
    }
  }

  saveAvatarState(avatar) {
    this.setState(() => ({
      avatar: avatar,
    }));
  }

  handelUpdateUserInfo(user) {
    this.setState({
      user: user,
    });
  }

  makeAlert(message, alertVariant) {
    this.setState({
      alertMessage: message,
      isShowAlert: true,
      alertVariant: alertVariant || this.defaultAlertVariant,
    });
  }

  disableAlert() {
    this.setState({
      isShowAlert: false,
      alertMessage: '',
      alertVariant: this.defaultAlertVariant,
    });
  }

  render() {
    const {
      isFetching, user, isShowAlert, avatar, alertMessage, alertVariant,
    } = this.state;
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
                {this.menuItems
                  .filter((item) => {
                    if (user.roleId === OWNER_ROLE_ID) {
                      return item.ownerSee === true;
                    }
                    return item.userSee === true;
                  })
                  .map((menuItem, index) => {
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
              {isShowAlert && (
                <Alert variant={alertVariant} onClose={() => this.disableAlert()} dismissible>
                  <Alert.Heading>{alertMessage}</Alert.Heading>
                </Alert>
              )}
              <Switch>
                <Redirect exact from="/profile" to="/profile/info" />
                <Route
                  path="/profile/info"
                  component={() => {
                    return (
                      <Info
                        isFetching={isFetching}
                        user={user}
                        avatar={avatar}
                      />
                    );
                  }}
                />
                <Route
                  path="/profile/edit"
                  component={() => {
                    return (
                      <ProfileEdit
                        user={user}
                        avatar={avatar}
                        updateUser={(updatedUser) => {
                          if (updatedUser && updatedUser.photoUrl && updatedUser.photoUrl.length) {
                            this.getAvatarUrl(updatedUser);
                          }
                          this.handelUpdateUserInfo(updatedUser);
                          this.makeAlert('Your profile was successfully updated');
                        }}
                      />
                    );
                  }}
                />
                <Route
                  path="/profile/avatar"
                  component={() => {
                    return (
                      <PhotoEditor
                        isFetching={isFetching}
                        user={user}
                        avatar={avatar}
                        title={(e) => this.makeAlert(e)}
                        updateAvatar={(newAvatar) => this.saveAvatarState(newAvatar)}
                      />
                    );
                  }}
                />
                <Route path="/profile/avatar" component={PhotoEditor} />
                <Route
                  path="/profile/owners-restaurants"
                  component={() => {
                    return (
                      <OwnersRestaurants
                        userId={user.id}
                      />
                    );
                  }}
                />
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
