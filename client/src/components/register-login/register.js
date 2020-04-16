import React, { Component } from 'react';
import {
  Container, Form, FormGroup, FormLabel,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Api from '../../services/api';
import MyBadge from '../shared/my-batch';

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
      nameInputTitle: 'Your name must be in range of 3-16 latin letters',
      nameInputClassName: '',
      phoneInputStarted: false,
      phoneInputTitle: "Phone number must be in '+***' format with digits",
      phoneInputClassName: '',
      emailInputStarted: false,
      emailInputTitle: 'email must consist of 5 or more symbols',
      emailInputClassName: '',
      showPassword: false,
      isPasswordShown: false,
      color: '#fcfffc',
      showWeak: false,
      showNormal: false,
      showGood: false,
      showStrong: false,
      passwordStrength: '',
      passwordInputStarted: false,
      passwordInputTitle: "Password shouldn't be weak and less than 8 symbols",
      passwordInputClassName: '',
      confirmPasswordInputTitle: 'Passwords must match each other',
      confirmPasswordInputClassName: '',
      isRegistered: false,
      invalidEmailOrPassword: false,
      unexpectedError: false,
      checkCount: 0,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateInputName = this.validateInputName.bind(this);
    this.validateInputPhone = this.validateInputPhone.bind(this);
    this.validateInputEmail = this.validateInputEmail.bind(this);
    this.validateInputPassword = this.validateInputPassword.bind(this);
    this.validateConfirmPassword = this.validateConfirmPassword.bind(this);
    this.isPasswordShown = this.isPasswordShown.bind(this);
  }

  setPasswordStateValid() {
    const { passwordStrength, password, confirmPassword } = this.state;
    const strong = passwordStrength !== 'weak' && passwordStrength !== '';
    if (strong) {
      this.setState({
        passwordInputClassName: valid,
      });
      if (confirmPassword === password) {
        this.setState({
          confirmPasswordInputClassName: valid,
        });
      }
    } else {
      this.setState({
        passwordInputClassName: invalid,
      });
    }
  }

  validateInputName(e) {
    const { value } = e.target;
    this.setState({
      name: value,
    });
    const nameRegex = RegExp(/^([a-zA-Z]+){3,16}$/);
    if (value.length >= 3) {
      if (!this.state.nameInputStarted) {
        this.setState({ nameInputStarted: value.length >= 3 });
      }
      const className = nameRegex.test(value) ? valid : invalid;
      this.setState({
        name: value,
        nameInputClassName: className,
      });
    } else if (this.state.nameInputStarted && !nameRegex.test(value)) {
      this.setState({
        nameInputClassName: invalid,
      });
    }
    if (value.length === 0) {
      this.setState({
        nameInputClassName: '',
        nameInputStarted: false,
      });
    }
  }

  validateInputPhone(e) {
    const { value } = e.target;
    this.setState({
      phoneNumber: value,
    });
    if (value.charAt(0) !== '+') {
      this.setState({
        phoneInputClassName: invalid,
      });
    }
    const phoneRegex = RegExp(/^\+[0-9]{7,16}$/);
    if (value.length >= 8) {
      if (!this.state.phoneInputStarted) {
        this.setState({ phoneInputStarted: value.length >= 8 });
      }
      const className = phoneRegex.test(value) ? valid : invalid;
      this.setState({
        phoneNumber: value,
        phoneInputClassName: className,
      });
    } else if (this.state.phoneInputStarted) {
      this.setState({
        phoneInputClassName: invalid,
      });
    }
    if (value.length === 0) {
      this.setState({
        phoneInputClassName: '',
      });
    }
  }

  validateInputEmail(e) {
    const { value } = e.target;

    this.setState({
      email: value,
    });
    const emailRegex = RegExp(
      /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    );
    const testEmailRegex = RegExp(
      /^\w+(@(\w+(\.(\w+)?)?)?)?$/,
    );
    if (value.length <= 5 && testEmailRegex.test(value) && this.state.emailInputClassName !== invalid) {
      this.setState({
        emailInputClassName: '',
      });
    } else if (value.length <= 5 && !testEmailRegex.test(value)) {
      this.setState({
        emailInputClassName: invalid,
      });
    } else if (value.length >= 5) {
      if (!this.state.emailInputStarted) {
        this.setState({ emailInputStarted: value.length >= 5 });
      }
      const className = emailRegex.test(value) ? valid : invalid;
      this.setState({
        email: value,
        emailInputClassName: className,
      });
    }
    if (value.length > 255) {
      this.setState({
        emailInputClassName: invalid,
      });
    }
    if (value.length === 0) {
      this.setState({
        emailInputClassName: '',
      });
    }
  }

  validateInputPassword(e) {
    const { value } = e.target;
    this.setState({
      showPassword: value.length > 0,
      password: value,
    });
    if (value.length >= 8) {
      if (!this.state.passwordInputStarted) {
        this.setState({ passwordInputStarted: value.length >= 8 });
      }
      this.isPasswordStrong(value);
      const { passwordStrength } = this.state;
      const strong = passwordStrength !== 'weak' && passwordStrength !== '';
      const className = strong ? valid : invalid;
      this.setState({
        passwordInputClassName: className,
      }, () => {
        this.setPasswordStateValid();
      });
    } else if (this.state.passwordInputStarted && value.length < 8) {
      this.setState({
        passwordInputClassName: invalid,
      });
    }
    if (value.length === 0) {
      this.setState({
        passwordInputClassName: '',
        passwordInputStarted: false,
        showWeak: false,
        confirmPasswordInputClassName: '',
      });
    } else if (value.length > 40) {
      this.setState({
        passwordInputClassName: invalid,
      });
    }
    if (value.length !== this.state.confirmPassword.length) {
      if (this.state.confirmPasswordInputClassName === valid) {
        this.setState({
          confirmPasswordInputClassName: invalid,
        });
      }
    }
  }

  validateConfirmPassword(e) {
    const { value } = e.target;
    this.setState({
      confirmPassword: value,
    });
    if (value.length > 0) {
      this.setState({
        showPassword: true,
      });
    }
    if (value.length >= 8) {
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
    if (value !== this.state.password && this.state.password.length > 0) {
      if (this.state.passwordStrength !== 'weak') {
        this.setState({
          confirmPasswordInputClassName: invalid,
        });
      }
    }
    if (value.length === 0) {
      console.log(this.state.password.length);
      this.setState({
        confirmPasswordInputClassName: '',
      });
    }
    this.checkConfirmLive(this.state.password, value);
  }


  handleSubmit() {
    const {
      name, phoneNumber, email, password,
    } = this.state;
    if (this.checkAllFields()) {
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
          } else if (response.error.status === 400) {
            this.setState({
              invalidEmailOrPassword: true,
            });
            setTimeout(() => {
              this.setState({
                invalidEmailOrPassword: false,
              });
            }, 3900);
          }
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error);
        });
      if (this.state.checkCount !== 1) {
        this.setState({
          checkCount: 0,
        });
      }
      setTimeout(() => {
        this.setState({
          checkCount: 0,
        });
      }, 3900);
    }
  }

  isPasswordShown() {
    const { isPasswordShown } = this.state;
    this.setState({ isPasswordShown: !isPasswordShown });
  }

  isPasswordStrong(value) {
    const weak = new RegExp(/^(?=.*[a-zа-я]).{8,}$/);
    const normal = new RegExp(/^(?=.*[a-zа-я])(?=.*\d).{8,}$/);
    const good = new RegExp(/^(?=.*[a-zа-я])(?=.*\d)(?=.*[A-ZА-Я]).{8,}$/);
    // eslint-disable-next-line no-useless-escape
    const strong = new RegExp(/^(?=.*[!@#$%^&*()\\\/|~.',<>?`:"{}\]\[]).{8,}$/);

    let checker = false;
    if (weak.test(value)) {
      this.setState({
        color: '#bc0008',
        passwordStrength: 'weak',
      });
      this.showWeak();
      checker = true;
    }
    if (normal.test(value)) {
      this.setState({
        color: '#ff8e33',
        passwordStrength: 'normal',
      });
      this.showNormal();
      checker = true;
    }
    if (good.test(value)) {
      this.setState({
        color: '#459bff',
        passwordStrength: 'good',
      });
      this.showGood();
      checker = true;
    }
    if (strong.test(value)) {
      this.setState({
        color: '#009d20',
        passwordStrength: 'strong',
        passwordInputClassName: valid,
      });
      this.showStrong();
      checker = true;
    }
    if (!checker) {
      this.setState({
        showWeak: true,
        showNormal: false,
        showGood: false,
        showStrong: false,
        color: '#bc0008',
        passwordStrength: 'weak',
      });
    }
  }

  showWeak() {
    const currentCallId = Math.random();
    this.setState({
      currentCallId,
      showWeak: true,
      showNormal: false,
      showGood: false,
      showStrong: false,
    });
    setTimeout(() => {
      if (currentCallId !== this.state.currentCallId) return;
      this.setState({
        showWeak: false,
      });
    }, 1900);
  }

  showNormal() {
    const currentCallId = Math.random();
    this.setState({
      currentCallId,
      showWeak: false,
      showNormal: true,
      showGood: false,
      showStrong: false,
    });
    setTimeout(() => {
      if (currentCallId !== this.state.currentCallId) return;
      this.setState({
        showNormal: false,
      });
    }, 1900);
  }

  showGood() {
    const currentCallId = Math.random();
    this.setState({
      currentCallId,
      showWeak: false,
      showNormal: false,
      showGood: true,
      showStrong: false,
    });
    setTimeout(() => {
      if (currentCallId !== this.state.currentCallId) return;
      this.setState({
        showGood: false,
      });
    }, 1900);
  }

  showStrong() {
    const currentCallId = Math.random();
    this.setState({
      currentCallId,
      showWeak: false,
      showNormal: false,
      showGood: false,
      showStrong: true,
    });
    setTimeout(() => {
      if (currentCallId !== this.state.currentCallId) return;
      this.setState({
        showStrong: false,
      });
    }, 1900);
  }

  firstLetter(s) {
    const name = s.toLowerCase();
    return name.replace(/^.{1}/g, s[0].toUpperCase());
  }

  checkAllFields() {
    const {
      nameInputClassName, phoneNumberInputClassName, emailInputClassName,
      passwordInputClassName, confirmPasswordInputClassName,
    } = this.state;
    let isValid = true;
    if (nameInputClassName !== valid) {
      isValid = false;
      setTimeout(() => {
        this.setState({
          nameInputClassName: invalid,
        });
      }, 100);
    }
    if (phoneNumberInputClassName !== valid) {
      isValid = false;
      setTimeout(() => {
        this.setState({
          phoneInputClassName: invalid,
        });
      }, 200);
    }
    if (emailInputClassName !== valid) {
      isValid = false;
      setTimeout(() => {
        this.setState({
          emailInputClassName: invalid,
        });
      }, 300);
    }
    if (passwordInputClassName !== valid) {
      isValid = false;
      setTimeout(() => {
        this.setState({
          passwordInputClassName: invalid,
        });
      }, 400);
    }
    if (confirmPasswordInputClassName !== valid) {
      isValid = false;
      setTimeout(() => {
        this.setState({
          confirmPasswordInputClassName: invalid,
        });
      }, 500);
    }
    return isValid;
  }

  checkConfirmLive(password, confirmPassword) {
    if (password > confirmPassword) {
      this.setState({
        confirmPasswordInputTitle: 'Passwords must match each other',
        confirmPasswordInputClassName: '',
      });
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < confirmPassword.length; i++) {
        if (confirmPassword.charAt(i) !== password.charAt(i)) {
          this.setState({
            confirmPasswordInputTitle: "Passwords don't match",
            confirmPasswordInputClassName: invalid,
          });
        }
      }
    }
  }


  render() {
    const {
      nameInputClassName, nameInputTitle, emailInputClassName,
      emailInputTitle, passwordInputClassName, passwordInputTitle,
      confirmPasswordInputClassName, confirmPasswordInputTitle,
      phoneInputClassName, phoneInputTitle, isRegistered,
      invalidEmailOrPassword, unexpectedError, checkCount,
      showPassword, isPasswordShown, color, password, showWeak,
      showNormal, showGood, showStrong,
    } = this.state;
    if (!isRegistered && !invalidEmailOrPassword && !unexpectedError) {
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
                  value={this.state.phoneNumber}
                  onChange={this.validateInputPhone}
                />
                <FormLabel htmlFor="email">e-mail</FormLabel>
                <input
                  className={emailInputClassName}
                  title={emailInputTitle}
                  type="email"
                  placeholder="email"
                  value={this.state.email}
                  onChange={this.validateInputEmail}
                />
                <FormLabel htmlFor="password">
                  Password
                  {showPassword
                  && (
                    // eslint-disable-next-line max-len
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
                    <img
                      id="image"
                      src={isPasswordShown ? '/img/show-password.png' : '/img/hide-password.png'}
                      alt="show"
                      style={{ height: 18, marginLeft: 6 }}
                      onClick={this.isPasswordShown}
                    />
                  )}
                  {password.length >= 8 && <text style={{ color: color }}> ● </text>}
                  {password.length >= 8 && showWeak && <text style={{ color: color, fontSize: 13 }}> weak </text>}
                  {password.length >= 8 && showNormal && <text style={{ color: color, fontSize: 13 }}> normal </text>}
                  {password.length >= 8 && showGood && <text style={{ color: color, fontSize: 13 }}> good </text>}
                  {password.length >= 8 && showStrong && <text style={{ color: color, fontSize: 13 }}> strong </text>}
                </FormLabel>
                <input
                  className={passwordInputClassName}
                  title={passwordInputTitle}
                  type={isPasswordShown ? 'text' : 'password'}
                  placeholder="password"
                  value={this.state.password}
                  onChange={this.validateInputPassword}
                />
                <input
                  className={confirmPasswordInputClassName}
                  title={confirmPasswordInputTitle}
                  type={isPasswordShown ? 'text' : 'password'}
                  placeholder="confirm password"
                  value={this.state.confirmPassword}
                  onChange={this.validateConfirmPassword}
                />
              </FormGroup>
            </Form>
          </div>
          <div className="footer">
            <button type="submit" className="btn-reg" onClick={this.handleSubmit}>
              Register
            </button>
            {checkCount !== 0 && (
              <MyBadge variant="danger" message="Something went wrong on server!" />
            )}
          </div>
        </Container>
      );
    }
    if (invalidEmailOrPassword && !unexpectedError) {
      return (
        <div>
          <div
            className="text-focus-in1"
            style={{
              fontSize: 20,
              color: '#FF0000',
              marginTop: 1,
            }}
          >
            <b>Email or phone number</b>
          </div>
          <div
            className="text-focus-in1"
            style={{
              fontSize: 20,
              color: '#FF0000',
            }}
          >
            <b>are already registered</b>
          </div>
          <div
            className="text-focus-in"
            style={{
              fontSize: 20,
              color: '#FF0000',
              marginBottom: 10,
            }}
          >
            Try again, please
          </div>
        </div>
      );
    }
    if (isRegistered && !unexpectedError) {
      return (
        <div>
          <div className="main">
            <div className="before">
              <div className="after" />
            </div>
          </div>
          <div
            className="focus-in-contract-bck"
            style={{
              fontSize: 22,
              color: '#3498db',
              marginTop: 220,
            }}
          >
            <b>
              Congratulations,
              {' '}
              {this.firstLetter(this.state.name)}
              !
            </b>
          </div>
          <div
            className="focus-in-contract-bck"
            style={{
              fontSize: 22,
              color: '#3498db',
              marginBottom: 60,
            }}
          >
            <b>You are registered!</b>
          </div>
          <div
            className="text-focus-in"
            style={{
              fontSize: 22,
              color: '#3498db',
              marginBottom: 40,
            }}
          >
            Now you can
            {' '}
            {' '}
            <Link to="/login"><b><u>log in</u></b></Link>
            {' '}
            :)
          </div>
        </div>
      );
    }
    return (
      <div>
        <div
          className="focus-in-contract-bck"
          style={{
            fontSize: 27,
            color: '#3498db',
            marginTop: 220,
          }}
        >
          <b>Something went wrong</b>
        </div>
        <div
          className="text-focus-in"
          style={{
            fontSize: 25,
            color: '#3498db',
            marginBottom: 10,
          }}
        >
          Try again later
        </div>
      </div>
    );
  }
}

export default Register;
