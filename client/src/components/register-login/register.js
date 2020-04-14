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
      isRegistered: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateInputName = this.validateInputName.bind(this);
    this.validateInputPhone = this.validateInputPhone.bind(this);
    this.validateInputEmail = this.validateInputEmail.bind(this);
    this.validateInputPassword = this.validateInputPassword.bind(this);
    this.validateConfirmPassword = this.validateConfirmPassword.bind(this);
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
      Api.post('persons', body)
        .then((response) => {
          if (response.status === 201) {
            this.setState({
              isRegistered: true,
            });
          }
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error);
        });
    }
  }

  validateInputName(e) {
    const { value } = e.target;
    this.setState({
      name: value,
    });
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
    } else if (this.state.nameInputStarted && value.length === 0) {
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

  validateInputPhone(e) {
    const { value } = e.target;
    if (value.charAt(0) !== '+') {
      this.setState({
        phoneInputClassName: invalid,
      });
    }
    const phoneRegex = RegExp(/^\+\d+$/);
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

  validateInputEmail(e) {
    const { value } = e.target;
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

  validateInputPassword(e) {
    const { value } = e.target;
    this.setState({
      passwordInputTitle: 'Use at least one upper and lower case letter with number.'
        + 'Password should be 8 or more symbols length',
      confirmPasswordInputTitle: 'Passwords must match each other',
    });
    const passwordRegex = RegExp(
      /^(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*\d)[a-zA-Z\dа-яА-Я]{8,}$/,
    );
    if (value.length >= 8) {
      if (!this.state.passwordInputStarted) {
        this.setState({ passwordInputStarted: value.length >= 8 });
      }
      const className = passwordRegex.test(value) ? valid : invalid;
      this.setState({
        password: value,
        passwordInputClassName: className,
      });
    } else if (this.state.passwordInputStarted && value.length < 8) {
      this.setState({
        passwordInputClassName: invalid,
      });
    }
    if (value.length > 40) {
      this.setState({
        passwordInputClassName: invalid,
      });
    }
    if (passwordRegex.exec(value) && this.state.confirmPassword.length >= 8) {
      const { confirmPassword } = this.state;
      const className = confirmPassword === value ? valid : invalid;
      this.setState({
        confirmPasswordInputClassName: className,
      });
    }
  }

  validateConfirmPassword(e) {
    const { value } = e.target;
    if (value.length >= 8) {
      this.setState({
        confirmPassword: value,
      });
      if (value.length === this.state.password.length && this.state.passwordInputClassName === valid) {
        this.setState({
          confirmPassword: value,
        }, () => {
          const { password, confirmPassword } = this.state;
          const className = confirmPassword === password ? valid : invalid;
          this.setState({
            confirmPasswordInputClassName: className,
          });
        });
      } else if (value.length > this.state.password.length && this.state.passwordInputClassName === valid) {
        this.setState({
          confirmPasswordInputClassName: invalid,
        });
      }
    }
  }

  render() {
    const {
      nameInputClassName, nameInputTitle, emailInputClassName,
      emailInputTitle, passwordInputClassName, passwordInputTitle,
      confirmPasswordInputClassName, confirmPasswordInputTitle,
      phoneInputClassName, phoneInputTitle, isRegistered,
    } = this.state;
    if (!isRegistered) {
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
                  placeholder="name"
                  value={this.state.name}
                  onChange={this.validateInputName}
                />
                <FormLabel htmlFor="text">Phone number</FormLabel>
                <input
                  className={phoneInputClassName}
                  title={phoneInputTitle}
                  type="text"
                  placeholder="phone number"
                  onChange={this.validateInputPhone}
                />
                <FormLabel htmlFor="email">e-mail</FormLabel>
                <input
                  className={emailInputClassName}
                  title={emailInputTitle}
                  type="email"
                  placeholder="email"
                  onChange={this.validateInputEmail}
                />
                <FormLabel htmlFor="password">Password</FormLabel>
                <input
                  className={passwordInputClassName}
                  title={passwordInputTitle}
                  type="password"
                  placeholder="password"
                  onChange={this.validateInputPassword}
                />
                <input
                  className={confirmPasswordInputClassName}
                  title={confirmPasswordInputTitle}
                  type="password"
                  placeholder="confirm password"
                  onChange={this.validateConfirmPassword}
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
    return (
      <div>
        You are registered!
      </div>
    );
  }
}

export default Register;
