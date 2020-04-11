import React, { Component } from 'react';
import { Container, Form, FormLabel } from 'react-bootstrap';
import loginImg from './sign-in.png';
import '../../styles/register-login-components.css';

class Login extends Component {
  render() {
    return (
      <Container className="base-container">
        <div className="header" style={{ color: '#52b5bb' }}>Login</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} alt="login" />
          </div>
          <Form className="form">
            <Form.Group>
              <FormLabel htmlFor="email" style={{ color: '#52b5bb' }}>e-mail</FormLabel>
              <input type="text" name="email" placeholder="email" />
              <FormLabel htmlFor="password" style={{ color: '#52b5bb' }}>Password</FormLabel>
              <input type="password" name="password" placeholder="password" />
            </Form.Group>
          </Form>
        </div>
        <div className="footer">
          <button type="button" className="btn-log">
            Login
          </button>
        </div>
      </Container>
    );
  }
}

export default Login;
