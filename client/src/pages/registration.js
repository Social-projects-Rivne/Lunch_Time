import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Login from '../components/register-login/login';
import Register from '../components/register-login/register';
import RightSide from '../components/register-login/right-side';
import '../styles/register-login-page.css';

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
    };
    this.changeState = this.changeState.bind(this);
  }

  componentDidMount() {
    this.rightSide.classList.add('right');
  }

  changeState() {
    const { isLogged } = this.state;
    if (isLogged) {
      this.rightSide.classList.remove('left');
      this.rightSide.classList.add('right');
    } else {
      this.rightSide.classList.remove('right');
      this.rightSide.classList.add('left');
    }
    this.setState((prevState) => ({ isLogged: !prevState.isLogged }));
  }

  render() {
    const { isLogged } = this.state;
    const current = isLogged ? 'Register' : 'Login';
    const currentActive = isLogged ? 'login' : 'register';
    return (
      <Container className="mainContainer">
        <div className="login">
          <div className="container" ref={(ref) => { this.container = ref; }}>
            {isLogged && <Login />}
            {!isLogged && <Register loginHandler={() => { this.props.loginHandler(); }} />}
          </div>
          <RightSide
            current={current}
            currentActive={currentActive}
            containerRef={(ref) => { this.rightSide = ref; }}
            onClick={this.changeState}
          />
        </div>
      </Container>
    );
  }
}

Registration.propTypes = {
  loginHandler: PropTypes.func.isRequired,
};

export default Registration;
