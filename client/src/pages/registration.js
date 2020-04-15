import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import Login from '../components/register-login/login';
import Register from '../components/register-login/register';
import '../styles/register-login-page.css';

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
    };
  }

  render() {
    const { isLogged } = this.state;
    return (
      <Container className="mainContainer">
        <div className="login">
          <div className="container" ref={(ref) => { this.container = ref; }}>
            {isLogged && <Login />}
            {!isLogged && <Register />}
          </div>
        </div>
      </Container>
    );
  }
}

export default Registration;
