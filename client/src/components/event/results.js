import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CardDeck, Container } from 'react-bootstrap';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Spinner from 'react-bootstrap/Spinner';
import CardView from './card-view';

class Results extends Component {
  render() {
    const {
      isFetching, events, eventContainerClassName,
      cardDeckClassName, spinnerContainerClassName,
      buttonToolbarClassName, spinnerAnimation,
      spinnerVariant, showLink,
    } = this.props;
    return (
      <Container className={eventContainerClassName}>
        {isFetching ? (
          <CardDeck className={cardDeckClassName}>
            {events.map((event) => (
              <CardView key={event.id} event={event} isFetching={isFetching} showLink={showLink} />
            ))}
          </CardDeck>
        ) : (
          <Container className={spinnerContainerClassName}>
            <ButtonToolbar className={buttonToolbarClassName}>
              <Spinner animation={spinnerAnimation} variant={spinnerVariant} />
            </ButtonToolbar>
          </Container>
        )}
      </Container>
    );
  }
}

Results.defaultProps = {
  eventContainerClassName: 'card-body pl-5 pr-5',
  cardDeckClassName: 'wrapper',
  spinnerContainerClassName: 'spinner-container',
  buttonToolbarClassName: 'justify-content-center',
  spinnerAnimation: 'border',
  spinnerVariant: 'warning',
  showLink: false,
};

Results.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  events: PropTypes.array.isRequired,
  eventContainerClassName: PropTypes.string,
  cardDeckClassName: PropTypes.string,
  spinnerContainerClassName: PropTypes.string,
  buttonToolbarClassName: PropTypes.string,
  spinnerAnimation: PropTypes.string,
  spinnerVariant: PropTypes.string,
  showLink: PropTypes.bool,
};

export default Results;
