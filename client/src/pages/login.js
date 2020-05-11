import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Api from '../services/api';
import Auth from '../services/auth';
import '../styles/login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.endpoint = 'authenticate';
    this.state = {
      email: '',
      password: '',
      errorMessage: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm() {
    const { email } = this.state;
    const { password } = this.state;
    return email.length > 5 && password.length > 7;
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  login() {
    const { loginHandler } = this.props;
    Api.post(this.endpoint, { email: this.state.email, password: this.state.password })
      .then((response) => {
        if (response.error && response.error.status === 403) {
          // eslint-disable-next-line no-console
          console.error(response);
          return response;
        }
        Auth.setToken(response.data);
        loginHandler();
        this.props.history.push('/');
        return response.data;
      })
      .then((token) => {
        Api.getCurrentUser('persons/currentUser', token)
          .then((response) => {
            if (response.error) {
              // eslint-disable-next-line no-console
              this.setState({ errorMessage: 'Invalid password or email' });
              return;
            }
            Auth.savePersonId(response && response.data && response.data.id);
          });
      })
      .catch((error) => {
        this.setState({ errorMessage: error.message });
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.login();
  }

  render() {
    const { errorMessage } = this.state;
    return (
      <div className="Login">
        <Form onSubmit={this.handleSubmit}>
          Email
          <Form.Group controlId="email">
            <Form.Control
              autoFocus
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </Form.Group>
          Password
          <Form.Group controlId="password">
            <Form.Control
              value={this.state.password}
              onChange={this.handleChange}
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
          { errorMessage && (
          <h2 className="error">
            {' '}
            { errorMessage }
            {' '}
          </h2>
          )}
        </Form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.any.isRequired,
  loginHandler: PropTypes.func.isRequired,
};

export default Login;
