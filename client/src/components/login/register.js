import React, { Component } from 'react';
import {
  Container, Form, FormGroup, FormLabel,
} from 'react-bootstrap';
import loginImg from './register.png';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordConfirm: '',
    };
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onChangePasswordConfirm(e) {
    this.setState({
      passwordConfirm: e.target.value,
    });
  }

  render() {
    const { email, password, passwordConfirm } = this.state;
    return (
      <Container className="base-container" style={{ color: '#3498db' }}>
        <div className="header">Register</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} alt="login" />
          </div>
          <Form className="form">
            <FormGroup>
              <FormLabel htmlFor="text">Name</FormLabel>
              <input
                type="text"
                name="name"
                placeholder="name"
                value={passwordConfirm}
                onChange={(e) => this.onChangePasswordConfirm(e)}
              />
              <FormLabel htmlFor="password">Phone number</FormLabel>
              <input
                type="text"
                name="phone number"
                placeholder="phone number"
                value={passwordConfirm}
                onChange={(e) => this.onChangePasswordConfirm(e)}
              />
              <FormLabel htmlFor="email">e-mail</FormLabel>
              <input
                type="email"
                name="email"
                placeholder="email"
                value={email}
                onChange={(e) => this.onChangeEmail(e, email)}
              />
              <FormLabel htmlFor="password">Password</FormLabel>
              <input
                type="password"
                name="password"
                placeholder="password"
                value={password}
                onChange={(e) => this.onChangePassword(e)}
              />
              <input
                type="password"
                name="password"
                placeholder="confirm password"
                value={passwordConfirm}
                onChange={(e) => this.onChangePasswordConfirm(e)}
              />
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
