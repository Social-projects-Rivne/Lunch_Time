import React, { Component } from 'react';
import {
  Container, ListGroup, Row, Col,
} from 'react-bootstrap';
import {
  Link, Switch, Route, Redirect,
} from 'react-router-dom';
import Info from './profile/info';
import History from './profile/history';
import Orders from './profile/orders';
import Settings from './profile/settings';
import Sharing from './profile/sharing';
import Subscriptions from './profile/subscriptions';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isFetching: false,
    };
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
    return (
      <Container fluid>
        <Container fluid className="page-header">
          <h1 className="page-header-title">
            Profile
          </h1>
        </Container>
        <Container className="card-body pl-5 pr-5">
          <Row>
            <Col md="3">
              <ListGroup>
                <ListGroup.Item>
                  <Link to="/profile/info">Info</Link>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Link to="/profile/orders">Orders</Link>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Link to="/profile/history">History</Link>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Link to="/profile/subscriptions">Subscriptions</Link>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Link to="/profile/sharing">Sharing</Link>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Link to="/profile/settings">Settings</Link>
                </ListGroup.Item>
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

export default Profile;
