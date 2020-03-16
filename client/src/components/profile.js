import React, { Component } from 'react';
import {
  Container, ListGroup, Row, Col,
} from 'react-bootstrap';
import {
  Link, Switch, Route, Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import Info from './profile/info';
import History from './profile/history';
import Orders from './profile/orders';
import Settings from './profile/settings';
import Sharing from './profile/sharing';
import Subscriptions from './profile/subscriptions';
import '../style/profile.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isFetching: false,
    };
    this.menuItems = [
      { path: '/profile/info', title: 'Info' },
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
    this.setState({
      user: {
        name: 'Sherlock Holmes',
        email: 'home@local.com',
        phone: '+380991234567',
      },
      isFetching: true,
    });
  }

  render() {
    const { isFetching, user } = this.state;
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
                    <ListGroup.Item key={index} active={location.pathname === menuItem.path}>
                      <Link to={menuItem.path}>{menuItem.title}</Link>
                    </ListGroup.Item>
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
                    return <Info isFetching={isFetching} user={user} />;
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
