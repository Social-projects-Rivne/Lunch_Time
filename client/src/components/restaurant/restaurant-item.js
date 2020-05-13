import React, { Component } from 'react';
import {
  Tab, Tabs, Container, Button, OverlayTrigger, Tooltip, Alert,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Api from '../../services/api';
import Auth from '../../services/auth';
import About from './restaurant-about';
import Menu from '../menu-views/menu-view';
import Feedback from '../feedback/feedback';
import RestaurantEvents from '../event/restaurant-events';
import '../../styles/restaurant-item.css';
import '../../styles/menu.css';

class Restaurant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: {},
      isFetching: false,
      selectedTab: this.props.selectedTab,
      isOwner: false,
    };
    this.personId = Auth.getPersonId();
  }

  async componentDidMount() {
    this.getOne();
  }

  getOne() {
    const { match } = this.props;
    Api.getOne('restaurants', match.params.id)
      .then((response) => {
        if (response.error) {
          // eslint-disable-next-line no-console
          console.error(response);
          return;
        }
        this.setState({
          restaurant: response.data,
          isFetching: true,
          isOwner: response.data.personId === this.personId,
        });
      });
  }

  render() {
    const {
      isFetching, restaurant, isOwner, selectedTab,
    } = this.state;
    const { match: { params: { id } }, isAuthenticated } = this.props;

    let isOwnerText;
    if (isOwner) {
      isOwnerText = (
        <Alert variant="info">
          You are the owner of this restaurant!
        </Alert>
      );
    }

    let newOrderBtn;
    if (isAuthenticated) {
      newOrderBtn = (
        <Link to={{
          pathname: `/restaurants/${id}/new-order`,
          state: {
            restaurantName: restaurant.name,
          },
        }}
        >
          <span className="d-inline-block ml-5">
            <Button>Make order</Button>
          </span>
        </Link>
      );
    } else {
      newOrderBtn = (
        <OverlayTrigger
          key="right"
          placement="right"
          overlay={<Tooltip id="tooltip-disabled">You need to login before to make order</Tooltip>}
        >
          <span className="d-inline-block ml-5">
            <Button disabled style={{ pointerEvents: 'none' }}>Make order</Button>
          </span>
        </OverlayTrigger>
      );
    }

    return (
      <Container className="restaurant-container">
        <h2>{restaurant.name}</h2>
        {isOwnerText}
        {newOrderBtn}
        <Tabs
          id="restaurant-tabs"
          activeKey={selectedTab}
          onSelect={(key) => this.setState({ selectedTab: key })}
        >
          <Tab eventKey="about" title="About" className="restaurant-tab">
            <About restaurant={restaurant} isFetching={isFetching} />
          </Tab>
          <Tab eventKey="menu" title="Menu" className="restaurant-tab">
            <Menu id={id} isAuthenticated={isAuthenticated} isOwner={isOwner} name={restaurant.name} />
          </Tab>
          <Tab eventKey="events" title="Events" className="restaurant-tab">
            <RestaurantEvents id={id} isOwner={isOwner} />
          </Tab>
          <Tab eventKey="feedback" title="Feedback" className="restaurant-tab">
            <Feedback id={id} isAuthenticated={isAuthenticated} />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

Restaurant.propTypes = {
  match: PropTypes.any.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  selectedTab: PropTypes.string,
};

Restaurant.defaultProps = {
  selectedTab: 'about',
};

export default Restaurant;
