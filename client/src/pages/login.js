/* eslint-disable react/jsx-no-bind */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Api from '../services/api';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: [],
    };
  }


  // eslint-disable-next-line react/sort-comp
  validate(email, password) {
    const errorMessage = [];

    if (email.length < 5) {
      errorMessage.push('Email should be at least 5 charcters long');
    }
    if (email.split('').filter((x) => x === '@').length !== 1) {
      errorMessage.push('Email should contain a @');
    }
    if (email.indexOf('.') === -1) {
      errorMessage.push('Email should contain at least one dot');
    }
    if (password.length < 7) {
      errorMessage.push('Password should be at least 8 characters long');
    }
    return errorMessage;
  }

  // eslint-disable-next-line react/sort-comp
  validateForm() {
    const { email } = this.state;
    const { password } = this.state;
    return email.length > 0 && password.length > 7;
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  getLogedin() {
    Api.getLogedin(this.state.email, this.state.password, this.state.errors)
      .then((response) => {
        // eslint-disable-next-line eqeqeq
        if (response.data == undefined) {
          this.setState({
            errorMessage: response.error,
          });
        }
        localStorage.setItem('Bearer ', response.data);
        // eslint-disable-next-line react/prop-types
        this.props.history.push('/');
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    // eslint-disable-next-line no-undef
    this.getLogedin();
  }

  render() {
    const { errorMessage } = this.state;
    return (
      <div className="Login">
        <Form onSubmit={this.handleSubmit.bind(this)}>
          Login
          <Form.Group controlId="email">
            <Form.Control
              autoFocus
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.handleChange.bind(this)}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Control
              value={this.state.password}
              onChange={this.handleChange.bind(this)}
              type="password"
            />
          </Form.Group>
          <Button
            block
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
          <p key={errorMessage}>
            {' '}
            {errorMessage}
          </p>
        </Form>
      </div>
    );
  }
}


export default withRouter(Login);
