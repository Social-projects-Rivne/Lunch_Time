import React, { Component } from 'react';
import {
  Container, Form, FormGroup, FormLabel,
} from 'react-bootstrap';
import regImg from './register.png';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <Container className="base-container" style={{ color: '#3498db' }}>
        <div className="header">Register</div>
        <div className="content">
          <div className="image">
            <img src={regImg} alt="register" />
          </div>
          <Form className="form" onSubmit={this.handleSubmit}>
            <FormGroup>
              <FormLabel htmlFor="text">Name</FormLabel>
              <input
                type="text"
                name="name"
                placeholder="name"
                noValidate
                onChange={this.handleChange}
              />
              <FormLabel htmlFor="email">e-mail</FormLabel>
              <input
                type="email"
                name="email"
                placeholder="email"
                noValidate
                onChange={this.handleChange}
              />
              <FormLabel htmlFor="password">Password</FormLabel>
              <input
                type="password"
                name="password"
                placeholder="password"
                noValidate
                onChange={this.handleChange}
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="confirm password"
                noValidate
                onChange={this.handleChange}
              />
            </FormGroup>
          </Form>
        </div>
        <div className="footer">
          <button type="submit" className="btn-reg">
            Register
          </button>
        </div>
      </Container>
    );
  }
}

export default Register;
