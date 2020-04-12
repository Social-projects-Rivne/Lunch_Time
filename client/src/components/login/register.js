import React, { Component } from 'react';
import {
  Container, Form, FormGroup, FormLabel,
} from 'react-bootstrap';
import regImg from './register.png';

const valid = 'form-control is-valid';
const invalid = 'form-control is-invalid';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nameInputStarted: false,
      nameInputTitle: '',
      nameInputClassName: '',
      emailInputStarted: false,
      emailInputTitle: '',
      emailInputClassName: '',
      passwordInputStarted: false,
      passwordInputTitle: '',
      passwordInputClassName: '',
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
    switch (name) {
      case 'name':
        this.validateInputName(value);
        break;
      case 'email':
        this.validateInputEmail(value);
        break;
      case 'password':
        this.validateInputPassword(value);
        break;
      case 'confirmPassword':
        this.validateInputName(value);
        break;
      default: break;
    }
  }

  validateInputName(value) {
    const nameRegex = RegExp(/^[a-zA-Z]+$/);
    if (value.length >= 3) {
      if (!this.state.nameInputStarted) {
        this.setState({ nameInputStarted: value.length >= 3 });
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
    } else if (this.state.nameInputStarted && value.length < 3) {
      this.setState({
        nameInputClassName: invalid,
      });
    }
    if (value.length > 16) {
      this.setState({
        nameInputClassName: invalid,
      });
    }
  }

  validateInputEmail(value) {
    const emailRegex = RegExp(
      /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    );
    if (value.length > 4) {
      if (!this.state.emailInputStarted) {
        this.setState({ emailInputStarted: value.length >= 5 });
      }
      const className = emailRegex.test(value) ? valid : invalid;
      this.setState({
        emailInputClassName: className,
        emailInputTitle: 'email must consist 5 or more symbols',
      });
    } else if (this.state.emailInputStarted && value.length <= 4) {
      this.setState({
        emailInputClassName: invalid,
      });
    }
    if (value.length > 255) {
      this.setState({
        emailInputClassName: invalid,
      });
    }
  }

  validateInputPassword(value) {
    const passwordRegex = RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
    );
    if (value.length >= 8) {
      if (!this.state.passwordInputStarted) {
        this.setState({ passwordInputStarted: value.length >= 8 });
      }
      const className = passwordRegex.test(value) ? valid : invalid;
      this.setState({
        passwordInputClassName: className,
        passwordInputTitle: 'Password must contain 8 symbols (upper case, lower case, number',
      });
    } else if (this.state.passwordInputStarted && value.length <= 8) {
      this.setState({
        passwordInputClassName: invalid,
      });
    }
    if (value.length > 40) {
      this.setState({
        passwordInputClassName: invalid,
      });
    }
  }

  render() {
    const {
      nameInputClassName, nameInputTitle, emailInputClassName, emailInputTitle,
      passwordInputClassName, passwordInputTitle,
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
                className={emailInputClassName}
                title={emailInputTitle}
                type="email"
                name="email"
                placeholder="email"
                noValidate
                onChange={this.handleChange}
              />
              <FormLabel htmlFor="password">Password</FormLabel>
              <input
                className={passwordInputClassName}
                title={passwordInputTitle}
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
