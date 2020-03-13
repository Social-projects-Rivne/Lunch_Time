import React, { Component } from 'react';
import {
  Container, ListGroup, Row, Col,
} from 'react-bootstrap';
import { Link, Switch, Route } from 'react-router-dom';
import Info from './profile/info';
import History from './profile/history';
import Orders from './profile/orders';
import Settings from './profile/settings';
import Sharing from './profile/sharing';
import Subscriptions from './profile/subscriptions';

class Profile extends Component {
  render() {
    return (
      <Container fluid className="page-container p-0">
        <Container fluid className="page-header">
          <h1 className="page-header-title">
            Profile
          </h1>
        </Container>
        <Container className="card-body pl-5 pr-5">
          <Row>
            <Col lg="3">
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
                <Route path="/profile/info" component={Info} />
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
