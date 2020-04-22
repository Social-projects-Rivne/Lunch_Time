import React, { Component } from 'react';
import {
  Container, Form, FormGroup, FormLabel,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import Api from '../../services/api';
import Timer from '../shared/timer';
import Auth from '../../services/auth';
import Person from '../../services/person';


const valid = 'form-control is-valid';
const invalid = 'form-control is-invalid';
const emailRegex = RegExp(
  /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
);
const validPassword = new RegExp(/^(?=.*([a-zа-я]|[A-ZА-Я]|[0-9])).{8,40}$/);

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      phoneNumber: '',
      email: '',
      password: '',
      confirmPassword: '',
      nameInputTitle: 'Your name must be in range of 3-16 latin letters',
      nameInputClassName: '',
      nameInputWrongClassName: false,
      phoneInputStarted: false,
      phoneInputTitle: "Phone number must be in '+***' format with digits",
      phoneInputClassName: '',
      phoneInputWrongClassName: false,
      emailInputStarted: false,
      emailInputTitle: 'email must consist of 5 or more symbols',
      emailInputClassName: '',
      emailInputWrongClassName: false,
      alreadyRegisteredPhoneNumber: '',
      alreadyRegisteredEmail: '',
      showPassword: false,
      isPasswordShown: false,
      color: '#fcfffc',
      showWeak: false,
      showEasy: false,
      showGood: false,
      showStrong: false,
      passwordStrength: '',
      passwordInputStarted: false,
      passwordInputTitle: "Password shouldn't be weak and less than 8 symbols",
      passwordInputClassName: '',
      passwordInputWrongClassName: false,
      confirmPasswordInputTitle: 'Passwords must match each other',
      confirmPasswordInputClassName: '',
      confirmPasswordInputWrongClassName: false,
      passwordsAreConfirmed: '',
      isRegistered: false,
      unexpectedError: '',
      openMainPage: '',
      buttonDisabled: false,
      photo1: '/img/register1.png',
      photo2: '/img/register2.png',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateInputName = this.validateInputName.bind(this);
    this.validateInputPhone = this.validateInputPhone.bind(this);
    this.validateInputEmail = this.validateInputEmail.bind(this);
    this.validateInputPassword = this.validateInputPassword.bind(this);
    this.validateConfirmPassword = this.validateConfirmPassword.bind(this);
    this.isPasswordShown = this.isPasswordShown.bind(this);
    this.openMainPage = this.openMainPage.bind(this);
  }

  setClassesNamesValid() {
    this.setState({
      passwordInputClassName: valid,
      confirmPasswordInputClassName: valid,
    });
  }

  setClassesNamesInvalid() {
    this.setState({
      confirmPasswordInputClassName: invalid,
    });
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
    const nameRegex = RegExp(/^.{1,50}$/);
    if (value.length >= 1) {
      this.setState({
        name: value,
        nameInputClassName: valid,
      });
    } else if (!nameRegex.test(value)) {
      this.setState({
        nameInputClassName: invalid,
      });
    }
    if (value.length === 0) {
      this.setState({
        nameInputClassName: '',
      });
    }
  }

  validateInputPhone(e) {
    const { value } = e.target;
    this.setState({
      phoneNumber: value,
    });
    if (value === this.state.alreadyRegisteredPhoneNumber) {
      setTimeout(() => {
        this.setState({
          phoneInputClassName: invalid,
          phoneInputTitle: 'This phone is already registered. Use another one.',
        });
      }, 150);
      return;
    }
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
    if (value === this.state.alreadyRegisteredEmail) {
      setTimeout(() => {
        this.setState({
          emailInputClassName: invalid,
          emailInputTitle: 'This email is already registered. Use another one.',
        });
      }, 150);
      return;
    }
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
      if (this.state.confirmPassword.length === 0) {
        this.setState({
          showPassword: false,
        });
      }
    }
    if (this.areEmailAndPasswordSame(value, this.state.password)) {
      this.showWeak();
    }
    this.checkConfirmPasswordStatus();
  }

  validateInputPassword(e) {
    const { value } = e.target;
    this.setState({
      password: value,
    });
    if (value.length > 0) {
      this.setState({
        showPassword: true,
      });
    } else if (value.length === 0 && this.state.confirmPassword === 0) {
      this.setState({
        showPassword: false,
      });
    }
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
      if (className && value !== this.state.confirmPassword) {
        if (this.state.confirmPassword.length > 0) {
          this.setState({
            confirmPasswordInputClassName: invalid,
          });
        }
      }
    } else if (this.state.passwordInputStarted && value.length < 8) {
      this.setState({
        passwordInputClassName: invalid,
        confirmPasswordInputClassName: '',
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
    if (this.state.passwordInputClassName === valid) {
      if (value !== this.state.email && emailRegex.test(this.state.email)) {
        this.setState({
          emailInputClassName: valid,
        });
      }
    }
    if (this.areEmailAndPasswordSame(this.state.email, value)) {
      this.showWeak();
    }
    if (value.length < 8 && this.state.confirmPassword.length > 0) {
      this.setState({
        confirmPasswordInputClassName: '',
      });
    }
  }

  checkConfirmPasswordStatus() {
    if (this.state.passwordInputClassName === invalid) {
      this.setState({
        confirmPasswordInputClassName: '',
      });
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
            passwordsAreConfirmed: true,
          });
        });
      } else if (value.length > this.state.password.length && this.state.passwordInputClassName === valid) {
        this.setState({
          confirmPasswordInputClassName: invalid,
        });
      }
    }
    this.checkConfirmLive(this.state.password, value);
    if (value.length === 0) {
      this.setState({
        confirmPasswordInputClassName: '',
        passwordsAreConfirmed: '',
      });
      if (this.state.password.length === 0) {
        this.setState({
          showPassword: false,
        });
      }
    }
  }

  handleSubmit() {
    this.setState({
      buttonDisabled: true,
    });
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
          if (response.status === 200) {
            Auth.setToken(response.data);
            Person.getProfile();
            this.setState({
              isRegistered: true,
              unexpectedError: false,
            });
            this.openMainPage();
          }
          if (response.status === 201) {
            this.setState({
              isRegistered: true,
              unexpectedError: false,
            });
            this.openMainPage();
          } else if (response.error.status === 400) {
            this.setState({
              unexpectedError: false,
            });
          } else if (response.error.status === 601) {
            this.setState({
              unexpectedError: false,
            });
            setTimeout(() => {
              this.setState({
                phoneInputClassName: invalid,
                phoneInputTitle: 'This phone is already registered. Use another one.',
                alreadyRegisteredPhoneNumber: phoneNumber,
                emailInputClassName: invalid,
                emailInputTitle: 'This email is already registered. Use another one.',
                alreadyRegisteredEmail: email,
              });
            }, 300);
          } else if (response.error.status === 602) {
            this.setState({
              unexpectedError: false,
            });
            setTimeout(() => {
              this.setState({
                phoneInputClassName: invalid,
                phoneInputTitle: 'This phone is already registered. Use another one.',
                alreadyRegisteredPhoneNumber: phoneNumber,
              });
            }, 300);
          } if (response.error.status === 603) {
            this.setState({
              unexpectedError: false,
            });
            setTimeout(() => {
              this.setState({
                emailInputClassName: invalid,
                emailInputTitle: 'This email is already registered. Use another one.',
                alreadyRegisteredPhoneNumber: phoneNumber,
              });
            }, 300);
          }
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error);
        })
        .finally(() => {
          if (this.state.unexpectedError === '') {
            this.setState({
              unexpectedError: true,
            });
            setTimeout(() => {
              this.setState({
                unexpectedError: '',
              });
            }, 5000);
          }
        });
    }
    this.setState({
      buttonDisabled: false,
    });
  }

  areEmailAndPasswordSame(email, password) {
    if (email.length > 5 && password.length >= 8) {
      if (email === password && emailRegex.test(email)) {
        this.setState({
          color: '#BC0008',
          passwordStrength: 'weak',
          emailInputClassName: invalid,
          passwordInputClassName: invalid,
          confirmPasswordInputClassName: '',
        });
        return true;
      }
      if (email !== password && password === this.state.confirmPassword) {
        this.setState({
          passwordInputClassName: valid,
          confirmPasswordInputClassName: valid,
        }, () => {
          this.setClassesNamesValid();
        });
      }
      if (password !== this.state.confirmPassword && this.state.confirmPassword.length > 0) {
        this.setState({
          confirmPasswordInputClassName: invalid,
        }, () => {
          this.setClassesNamesInvalid();
        });
      }
    }
    if (emailRegex.test(email)) {
      this.setState({
        emailInputClassName: valid,
      });
    }
    if (validPassword.test(password)) {
      this.setState({
        passwordInputClassName: valid,
      });
      this.isPasswordStrong(password);
    }
    return false;
  }

  checkConfirmLive(password, confirmPassword) {
    if (password > confirmPassword) {
      this.setState({
        confirmPasswordInputTitle: 'Passwords must match each other',
        confirmPasswordInputClassName: '',
      });
      if (!this.state.passwordsAreConfirmed) {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < confirmPassword.length; i++) {
          if (confirmPassword.charAt(i) !== password.charAt(i)) {
            this.setState({
              confirmPasswordInputTitle: "Passwords don't match each other",
              confirmPasswordInputClassName: invalid,
            });
          }
        }
      } else if (password.length !== confirmPassword.length) {
        this.setState({
          confirmPasswordInputClassName: invalid,
        });
      }
    }
  }

  checkAllFields() {
    const {
      nameInputClassName, phoneInputClassName, emailInputClassName,
      passwordInputClassName, confirmPasswordInputClassName,
    } = this.state;
    let isValid = true;
    if (nameInputClassName !== valid) {
      isValid = false;
      this.setState({
        nameInputWrongClassName: true,
      });
      setTimeout(() => {
        this.setState({
          nameInputClassName: invalid,
          nameInputWrongClassName: false,
        });
      }, 100);
    }
    if (phoneInputClassName !== valid) {
      isValid = false;
      setTimeout(() => {
        this.setState({
          phoneInputWrongClassName: true,
        });
      }, 100);
      this.setState({
      });
      setTimeout(() => {
        this.setState({
          phoneInputClassName: invalid,
          phoneInputWrongClassName: false,
        });
      }, 200);
    }
    if (emailInputClassName !== valid) {
      isValid = false;
      setTimeout(() => {
        this.setState({
          emailInputWrongClassName: true,
        });
      }, 200);
      setTimeout(() => {
        this.setState({
          emailInputClassName: invalid,
          emailInputWrongClassName: false,
        });
      }, 300);
    }
    if (passwordInputClassName !== valid) {
      isValid = false;
      setTimeout(() => {
        this.setState({
          passwordInputWrongClassName: true,
        });
      }, 300);
      setTimeout(() => {
        this.setState({
          passwordInputClassName: invalid,
          passwordInputWrongClassName: false,
        });
      }, 400);
    }
    if (confirmPasswordInputClassName !== valid) {
      isValid = false;
      setTimeout(() => {
        this.setState({
          confirmPasswordInputWrongClassName: true,
        });
      }, 400);
      setTimeout(() => {
        this.setState({
          confirmPasswordInputClassName: invalid,
          confirmPasswordInputWrongClassName: false,
        });
      }, 500);
    }
    return isValid;
  }

  isPasswordShown() {
    const { isPasswordShown } = this.state;
    this.setState({ isPasswordShown: !isPasswordShown });
  }

  isPasswordStrong(value) {
    const easy = new RegExp(/^(?=.*([a-zа-я]|[A-ZА-Я]|[0-9])).{8,40}$/);
    const good = new RegExp(/^(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*\d).{8,40}$/);
    // eslint-disable-next-line no-useless-escape
    const strong = new RegExp(/^(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*\d)(?=.*[!@#$%^&*()\\\/|~.',<>?`:"{}\]\[]).{8,40}$/);
    // eslint-disable-next-line no-useless-escape
    const chars = new RegExp(/(?=.*[!@#$%^&*()\\\/|~.',+<>?`:"{}\]\[]).{8,40}$/);
    // eslint-disable-next-line no-useless-escape
    const charsAndDigits = new RegExp(/(?=.*\d)(?=.*[!@#$%^&*()\\\/|+~.',<>?`:"{}\]\[]).{8,40}$/);

    let checker = false;
    if (easy.test(value)) {
      this.setState({
        color: '#ff8e33',
        passwordStrength: 'easy',
      });
      this.showEasy();
      checker = true;
    }
    if (good.test(value) || chars.test(value) || charsAndDigits.test(value)) {
      this.setState({
        color: '#459bff',
        passwordStrength: 'good',
      });
      this.showGood();
      checker = true;
    }
    if (strong.test(value)) {
      this.setState({
        color: '#13aa03',
        passwordStrength: 'strong',
        passwordInputClassName: valid,
      });
      this.showStrong();
      checker = true;
    }
    if (!checker) {
      this.setState({
        showWeak: true,
        showEasy: false,
        showGood: false,
        showStrong: false,
        color: '#BC0008',
        passwordStrength: 'weak',
      });
    }
  }

  showWeak() {
    const currentCallId = Math.random();
    this.setState({
      currentCallId,
      showWeak: true,
      showEasy: false,
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

  showEasy() {
    const currentCallId = Math.random();
    this.setState({
      currentCallId,
      showWeak: false,
      showEasy: true,
      showGood: false,
      showStrong: false,
    });
    setTimeout(() => {
      if (currentCallId !== this.state.currentCallId) return;
      this.setState({
        showEasy: false,
      });
    }, 1900);
  }

  showGood() {
    const currentCallId = Math.random();
    this.setState({
      currentCallId,
      showWeak: false,
      showEasy: false,
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
      showEasy: false,
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

  openMainPage() {
    this.loginHandler();
    setTimeout(() => {
      this.setState({
        openMainPage: true,
      });
    }, 6000);
  }

  loginHandler() {
    this.props.loginHandler();
  }

  photo() {
    const { photo2 } = this.state;
    setTimeout(() => {
      this.setState({
        photo1: photo2,
      });
    }, 14000);
  }

  render() {
    const {
      nameInputClassName, nameInputTitle, emailInputClassName,
      emailInputTitle, passwordInputClassName, passwordInputTitle,
      confirmPasswordInputClassName, confirmPasswordInputTitle,
      phoneInputClassName, phoneInputTitle, isRegistered, unexpectedError,
      showPassword, isPasswordShown, color, password, showWeak,
      showEasy, showGood, showStrong, photo1, openMainPage,
      buttonDisabled, nameInputWrongClassName, phoneInputWrongClassName,
      emailInputWrongClassName, passwordInputWrongClassName,
      confirmPasswordInputWrongClassName, name,
    } = this.state;
    const nameBackgroundColor = nameInputWrongClassName ? 'rgba(246,3,43,0.36)' : '#dff1ff4a';
    const phoneBackgroundColor = phoneInputWrongClassName ? 'rgba(246,3,43,0.36)' : '#dff1ff4a';
    const emailBackgroundColor = emailInputWrongClassName ? 'rgba(246,3,43,0.36)' : '#dff1ff4a';
    const passwordBackgroundColor = passwordInputWrongClassName ? 'rgba(246,3,43,0.36)' : '#dff1ff4a';
    const confirmPasswordBackgroundColor = confirmPasswordInputWrongClassName ? 'rgba(246,3,43,0.36)' : '#dff1ff4a';
    this.photo();
    if (!isRegistered) {
      return (
        <Container className="base-container" style={{ color: '#3498db' }}>
          <div className="header">Register</div>
          <div className="content">
            <div className="image">
              <img src={photo1} alt="register" />
            </div>
            {unexpectedError !== true
            && (
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
                  style={{
                    backgroundColor: nameBackgroundColor,
                  }}
                />
                <FormLabel htmlFor="text">Phone number</FormLabel>
                <input
                  className={phoneInputClassName}
                  title={phoneInputTitle}
                  type="text"
                  placeholder="phone number"
                  value={this.state.phoneNumber}
                  onChange={this.validateInputPhone}
                  style={{
                    backgroundColor: phoneBackgroundColor,
                  }}
                />
                <FormLabel htmlFor="email">e-mail</FormLabel>
                <input
                  className={emailInputClassName}
                  title={emailInputTitle}
                  type="email"
                  placeholder="email"
                  value={this.state.email}
                  onChange={this.validateInputEmail}
                  style={{
                    backgroundColor: emailBackgroundColor,
                  }}
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
                      style={{ height: 18, marginLeft: 6, cursor: 'pointer' }}
                      onClick={this.isPasswordShown}
                    />
                  )}
                  {password.length >= 8 && <text style={{ color: color }}> ● </text>}
                  {password.length >= 8 && showWeak && (
                  <text style={{ color: color, fontSize: 13 }}>
                    password equals email
                  </text>
                  )}
                  {password.length >= 8 && showEasy && <text style={{ color: color, fontSize: 13 }}> easy </text>}
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
                  style={{
                    backgroundColor: passwordBackgroundColor,
                  }}
                />
                <input
                  className={confirmPasswordInputClassName}
                  title={confirmPasswordInputTitle}
                  type={isPasswordShown ? 'text' : 'password'}
                  placeholder="confirm password"
                  value={this.state.confirmPassword}
                  onChange={this.validateConfirmPassword}
                  style={{
                    backgroundColor: confirmPasswordBackgroundColor,
                  }}
                />
              </FormGroup>
            </Form>
            )}
            {unexpectedError
            && (
              <div>
                <div
                  className="focus-in-contract-bck"
                  style={{
                    fontSize: 27,
                    color: '#3498db',
                    marginTop: 220,
                  }}
                >
                  <b>
                    Something went
                    <br />
                    wrong on server
                  </b>
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
            )}
          </div>
          {unexpectedError !== true
          && (
          <div className="footer">
            <button
              type="submit"
              className="btn-reg"
              disabled={buttonDisabled}
              onClick={this.handleSubmit}
            >
              Register
            </button>
          </div>
          )}
        </Container>
      );
    }
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
            {name.length > 8 && <br />}
            {name}
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
          You will be forwarded to
          {' '}
          <br />
          <Link to="/"><b><u>main page</u></b></Link>
          {' '}
          in
          {' '}
          <Timer timerCount={5} />
          {' '}
          seconds
        </div>
        {openMainPage && <Redirect to="/" />}
      </div>
    );
  }
}

Register.propTypes = {
  loginHandler: PropTypes.func.isRequired,
};

export default Register;
