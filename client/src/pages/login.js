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
      errorKey: false,
      errorMessage: '',
      errorMess: [],
    };
    this.errorMessageRewiew = this.errorMessageRewiew.bind(this);
  }

  // eslint-disable-next-line react/sort-comp
  errorMessageRewiew() {
    this.setState({ errorKey: true });
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
        // eslint-disable-next-line eqeqeq
        if (response.status >= 200 && response.status < 300) {
          localStorage.setItem('Bearer ', response.data);
          // eslint-disable-next-line react/prop-types
          this.props.history.push('/');
        } else if (response.status > 400) {
          this.errorMessageRewiew(); this.setState({ errorMessage: 'something goes wrong' });
          this.setState({ errorMess: 'errror suka' });
        }
      }).catch((error) => {
        this.errorMessageRewiew();
        this.setState({ errorMessage: error.message });
        this.setState({ errorMess: error.message });
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    // eslint-disable-next-line no-undef
    this.getLogedin();
  }

  render() {
    const { errorKey } = this.state;
    return (
      <div className="Login">
        <Form onSubmit={this.handleSubmit.bind(this)}>
          Email
          <Form.Group controlId="email">
            <Form.Control
              autoFocus
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.handleChange.bind(this)}
            />
          </Form.Group>
          Password
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
          {errorKey && (
          // eslint-disable-next-line react/jsx-no-undef
          <MyBadge className="badge" variant="warning" message="Invalid email or password" />
          )}
          { errorKey && (
          <h3 className="error">
            {' '}
            { errorKey }
            {' '}
          </h3>
          )}
          { this.state.errorMessage && (
          <h3 className="error">
            {' '}
            { this.state.errorMessage }
            {' '}
          </h3>
          )}
          { this.state.errorMess && (
          <h3 className="error">
            {' '}
            { this.state.errorMess }
            {' '}
          </h3>
          )}
        </Form>
      </div>
    );
  }
}


export default withRouter(Login);
