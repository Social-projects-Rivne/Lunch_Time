import React, { Component } from 'react';
import {
  Container, Form, FormGroup, FormLabel,
} from 'react-bootstrap';
import Api from '../../services/api';

const valid = 'form-control is-valid';
const invalid = 'form-control is-invalid';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      phoneNumber: '',
      email: '',
      password: '',
      confirmPassword: '',
      nameInputStarted: false,
      nameInputTitle: '',
      nameInputClassName: '',
      phoneInputStarted: false,
      phoneInputTitle: '',
      phoneInputClassName: '',
      emailInputStarted: false,
      emailInputTitle: '',
      emailInputClassName: '',
      passwordInputStarted: false,
      passwordInputTitle: '',
      passwordInputClassName: '',
      confirmPasswordInputTitle: '',
      confirmPasswordInputClassName: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit() {
    const {
      nameInputClassName, phoneInputClassName, emailInputClassName,
      passwordInputClassName, confirmPasswordInputClassName, name, phoneNumber,
      email, password,
    } = this.state;
    if (nameInputClassName === valid
      && phoneInputClassName === valid
      && emailInputClassName === valid
      && passwordInputClassName === valid
      && confirmPasswordInputClassName === valid) {
      const body = {
        name: name,
        phoneNumber: phoneNumber,
        email: email,
        password: password,
      };
      Api.post('registration', body)
        .then((response) => {
          if (response.status === 200) {
            // eslint-disable-next-line no-console
            console.log('Ok');
          }
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error);
        });
      console.log(body);
    }
  }

  handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        this.validateInputName(value);
        break;
      case 'phone':
        this.validateInputPhone(value);
        break;
      case 'email':
        this.validateInputEmail(value);
        break;
      case 'password':
        this.validateInputPassword(value);
        break;
      case 'confirmPassword':
        this.validateConfirmPassword(value);
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
        name: value,
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

  validateInputPhone(value) {
    const phoneRegex = RegExp(/^\+\d+/);
    const finalPhoneRegex = RegExp(/^\+[0-9]{12}$/);
    if (value.length === 13) {
      if (!this.state.phoneInputStarted) {
        this.setState({ phoneInputStarted: value.length >= 13 });
      }
      const className = finalPhoneRegex.test(value) ? valid : invalid;
      this.setState({
        phoneNumber: value,
        phoneInputClassName: className,
        phoneInputTitle: "Phone number must be in '+380...' format with 12 digits",
      });
    } else if (value.length > 1 && !phoneRegex.test(value)) {
      this.setState({
        phoneInputClassName: invalid,
      });
    } else if (this.state.phoneInputStarted) {
      this.setState({
        phoneInputClassName: invalid,
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
        email: value,
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
        password: value,
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
    if (this.state.passwordInputClassName === valid && this.state.confirmPassword.length >= 8) {
      const { confirmPassword } = this.state;
      const confirm = confirmPassword === value ? valid : invalid;
      this.setState({
        confirmPasswordInputClassName: confirm,
      });
    }
  }

  validateConfirmPassword(value) {
    if (value.length >= 8) {
      this.setState({
        confirmPasswordInputTitle: 'Passwords must match each other',
        confirmPassword: value,
      }, () => {
        this.checkPasswords();
      });
    }
  }

  checkPasswords() {
    const { password, confirmPassword } = this.state;
    const className = confirmPassword === password ? valid : invalid;
    this.setState({
      confirmPasswordInputClassName: className,
    });
  }

  render() {
    const {
      nameInputClassName, nameInputTitle, emailInputClassName,
      emailInputTitle, passwordInputClassName, passwordInputTitle,
      confirmPasswordInputClassName, confirmPasswordInputTitle,
      phoneInputClassName, phoneInputTitle,
    } = this.state;
    return (
      <Container className="base-container" style={{ color: '#3498db' }}>
        <div className="header">Register</div>
        <div className="content">
          <div className="image">
            <img src="/img/register.png" alt="register" />
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
              <FormLabel htmlFor="text">Phone number</FormLabel>
              <input
                className={phoneInputClassName}
                title={phoneInputTitle}
                type="text"
                name="phone"
                placeholder="phone number"
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
                className={confirmPasswordInputClassName}
                title={confirmPasswordInputTitle}
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
          <button type="submit" className="btn-reg" onClick={this.handleSubmit}>
            Register
          </button>
        </div>
      </Container>
    );
  }
}

export default Register;
