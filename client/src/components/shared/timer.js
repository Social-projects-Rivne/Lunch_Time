import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timerCount: this.props.timerCount,
    };
  }

  componentDidMount() {
    this.doIntervalChange();
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  hide() {
    this.props.showTimer(false);
  }

  doIntervalChange() {
    if (this.state.count === 0) {
      this.hide();
    }
    this.myInterval = setInterval(() => {
      this.setState((prevState) => ({
        timerCount: prevState.timerCount - 1,
      }));
    }, 1000);
  }

  render() {
    const { timerCount } = this.state;
    return (
      <b>
        <>{timerCount}</>
      </b>
    );
  }
}

Timer.defaultProps = {
  showTimer: '',
};

Timer.propTypes = {
  showTimer: PropTypes.func,
  timerCount: PropTypes.any.isRequired,
};

export default Timer;
