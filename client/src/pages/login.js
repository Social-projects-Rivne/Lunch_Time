/* eslint-disable react/jsx-no-bind */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../style/login.css';
import axios from 'axios';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

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
  // handleChangeEmail(event) {
  //   this.setState({
  //     email: event.target.value,
  //   });
  // }

  // handleChangePassword(event) {
  //   this.setState({
  //     password: event.target.value,
  //   });
  // }

  handleSubmit(event) {
    event.preventDefault();
    axios.post('/authenticate', {
      email: this.state.email,
      password: this.state.password,

    }).then((res) => {
      localStorage.setItem('Bearer ', res.data);
      // eslint-disable-next-line react/prop-types
      this.props.history.push('/');
    });
  }


  render() {
    return (
      <div className="Login">
        <Form onSubmit={this.handleSubmit.bind(this)}>
          Login
          <Form.Group controlId="email">
            <Form.Control
              autoFocus
              name="uname"
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
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </Form>
      </div>
    );
  }
}


export default withRouter(Login);
