import React, { Component } from 'react';
import {
  Container, Form, FormGroup, FormLabel,
} from 'react-bootstrap';
import regImg from './register.png';

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
);
const nameRegex = RegExp(/^[a-zA-Z]+$/);
const valid = 'form-control is-valid';
const invalid = 'form-control is-invalid';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      nameInputStarted: false,
      nameInputTitle: '',
      nameInputClassName: '',
      formErrors: {
        name: true,
        email: false,
        password: true,
        confirmPassword: true,
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    // eslint-disable-next-line react/no-access-state-in-setstate
    const formErrors = { ...this.state.formErrors };
    switch (name) {
      case 'name':
        this.validateInputName(value);
        break;
      case 'email':
        formErrors.email = emailRegex.test(value);
        this.setState({ email: value });
        break;
      case 'password':
        formErrors.password = value.length < 6;
        this.setState({ password: value });
        break;
      case 'confirmPassword':
        formErrors.confirmPassword = value !== this.state.password;
        this.setState({ confirmPassword: value });
        break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value });
  }

  validateInputName(value) {
    if (value.length > 2) {
      if (!this.state.nameInputStarted) {
        this.setState({ nameInputStarted: value.length > 2 });
      }
      const className = nameRegex.test(value) ? valid : invalid;
      this.setState({
        nameInputClassName: className,
        nameInputTitle: 'Your name must be in range of 3-16 latin letters',
      });
    } else if (!nameRegex.test(value)) {
      this.setState({
        nameInputClassName: invalid,
      });
    }
  }

  render() {
    const {
      // eslint-disable-next-line no-unused-vars
      formErrors, name, email, password, confirmPassword, nameInputTitle, nameInputClassName,
    } = this.state;
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
                className={nameInputClassName}
                title={nameInputTitle}
                type="text"
                name="name"
                placeholder="name"
                noValidate
                onChange={this.handleChange}
              />
              <FormLabel htmlFor="email">e-mail</FormLabel>
              <input
                className={formErrors.email ? valid : invalid}
                type="email"
                name="email"
                placeholder="email"
                noValidate
                onChange={this.handleChange}
              />
              <FormLabel htmlFor="password">Password</FormLabel>
              <input
                className={formErrors.password ? invalid : valid}
                type="password"
                name="password"
                placeholder="password"
                noValidate
                onChange={this.handleChange}
              />
              <input
                className={formErrors.confirmPassword ? invalid : valid}
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
