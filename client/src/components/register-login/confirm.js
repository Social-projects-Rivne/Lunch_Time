import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import Api from '../../services/api';

class Confirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'Confirming your account...',
      mainPage: false,
    };
  }

  componentDidMount() {
    Api.get(`persons/confirm/${this.props.match.params.code}`)
      .then((response) => {
        if (response.error) {
          // eslint-disable-next-line no-console
          console.error(response);
          this.setState({
            message: 'Your activation code is wrong. Try again, please',
          });
          return;
        }
        this.setState({
          message: 'Your account is successfully confirmed! You will be redirected to main page now',
        });
        setTimeout(() => {
          this.setState({
            mainPage: true,
          });
        }, 7000);
      });
  }

  render() {
    return (
      <Container>
        <h1 style={{ textAlign: 'center' }}>{this.state.message}</h1>
        {this.state.mainPage && <Redirect to="/" /> }
      </Container>
    );
  }
}

Confirm.propTypes = {
  match: PropTypes.any.isRequired,
};

export default Confirm;
