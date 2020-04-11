import React, { Component } from 'react';
import {
  Container, Form, FormGroup, FormLabel,
} from 'react-bootstrap';
import loginImg from './register.png';

class Register extends Component {
  render() {
    return (
      <Container className="base-container">
        <div className="header" style={{ color: '#3498db' }}>Register</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} alt="login" />
          </div>
          <Form className="form">
            <FormGroup>
              <FormLabel htmlFor="email" style={{ color: '#3498db' }}>e-mail</FormLabel>
              <input type="text" name="email" placeholder="email" />
              <FormLabel htmlFor="number" style={{ color: '#3498db' }}>Phone Number</FormLabel>
              <input type="text" name="phone-number" placeholder="phone number" />
              <FormLabel htmlFor="password" style={{ color: '#3498db' }}>Password</FormLabel>
              <input type="text" name="password" placeholder="password" />
              <FormLabel htmlFor="password" style={{ color: '#3498db' }}>Repeat password</FormLabel>
              <input type="text" name="password" placeholder="repeat password" />
            </FormGroup>
          </Form>
        </div>
        <div className="footer">
          <button type="button" className="btn-reg">
            Register
          </button>
        </div>
      </Container>
    );
  }
}

export default Register;
