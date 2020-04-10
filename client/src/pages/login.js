import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Api from '../services/api';
import '../styles/login.css';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    Api.getLogedin(this.state.email, this.state.password)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          localStorage.setItem('Bearer ', response.data);
          // eslint-disable-next-line react/prop-types
          this.props.history.push('/');
        } else if (response.error.status === 403) {
          this.setState({ errorMessage: 'Email or password incorrect' });
        }
      }).catch((error) => {
        this.setState({ errorMessage: error.message });
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


export default withRouter(Login);
