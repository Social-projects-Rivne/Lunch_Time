import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Api from '../../services/api';
import '../../styles/feedback-send.css';
import MyBadge from '../shared/my-batch';
import CancelButton from '../shared/button/cancel';

class FeedbackSend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      isLoading: false,
      timerCount: 3,
      showTimer: true,
      tooShortFeedback: false,
      tooLongFeedback: false,
      feedbackSent: false,
      feedbackNotSent: false,
      inputDisabled: false,
      attemptCount: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.tooShortFeedback = this.tooShortFeedback.bind(this);
    this.tooLongFeedback = this.tooLongFeedback.bind(this);
    this.sendApi = this.sendApi.bind(this);
    this.cancel = this.cancel.bind(this);
    this.showFeedbackSent = this.showFeedbackSent.bind(this);
    this.showFeedbackNotSent = this.showFeedbackNotSent.bind(this);
    this.showTimer = this.showTimer.bind(this);
  }

  onSubmit() {
    if (this.state.description.length < 10) {
      this.tooShortFeedback();
    } else if (this.state.description.length > 400) {
      this.tooLongFeedback();
    } else {
      this.sendApi();
    }
  }

  handleChange(e) {
    this.setState({
      description: e.target.value,
      tooShortFeedback: false,
    });
    // eslint-disable-next-line no-unused-expressions
    e.target.value.length > 400
      ? this.setState({
        tooLongFeedback: true,
      })
      : this.setState({
        tooLongFeedback: false,
        attemptCount: false,
      });
  }

  tooShortFeedback() {
    const currentCallId = Math.random();
    this.setState({
      currentCallId,
      tooShortFeedback: true,
    });
    setTimeout(() => {
      if (currentCallId !== this.state.currentCallId) return;
      this.setState({
        tooShortFeedback: false,
      });
    }, 3000);
  }

  tooLongFeedback() {
    const currentCallId = Math.random();
    this.setState({
      currentCallId,
      attemptCount: true,
      tooLongFeedback: true,
    });
    setTimeout(() => {
      if (currentCallId !== this.state.currentCallId) return;
      this.setState({
        tooLongFeedback: true,
        attemptCount: false,
      });
    }, 120);
  }

  sendApi() {
    const currentCallId = Math.random();
    this.setState({
      isLoading: true,
      tooShortFeedback: false,
      tooLongFeedback: false,
      showTimer: true,
      inputDisabled: true,
      currentCallId,
    });
    setTimeout(() => {
      if (currentCallId !== this.state.currentCallId) return;
      this.setState({
        showTimer: false,
      });
    }, 4000);
    setTimeout(() => {
      if (currentCallId !== this.state.currentCallId) return;
      Api.post('feedback', {
        personId: 480,
        restId: this.props.id,
        description: this.state.description,
      })
        .then((response) => {
          if (currentCallId !== this.state.currentCallId
            && !this.state.isLoading
            && response) return;
          this.showFeedbackSent();
          this.props.refreshed();
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error);
          this.showFeedbackNotSent();
        })
        .finally(() => {
          if (currentCallId !== this.state.currentCallId) return;
          this.setState({ isLoading: false, inputDisabled: false });
        });
    }, 4000);
  }

  cancel() {
    this.setState({
      isLoading: false,
      showTimer: false,
      inputDisabled: false,
    });
  }

  showFeedbackSent() {
    this.setState({ description: '', feedbackSent: true });
    setTimeout(() => {
      this.setState({
        feedbackSent: false,
      });
    }, 3000);
  }

  showFeedbackNotSent() {
    this.setState({ feedbackNotSent: true });
    setTimeout(() => this.setState({
      feedbackNotSent: false,
    }), 2000);
  }

  showTimer(newValue) {
    this.setState({
      showTimer: newValue,
    });
  }

  render() {
    const {
      inputDisabled, description, isLoading, tooShortFeedback,
      tooLongFeedback, feedbackNotSent, timerCount,
      showTimer, attemptCount, feedbackSent,
    } = this.state;
    const tooLong = 'Your feedback must be not more than 400 symbols';
    return (
      <Form.Group className="m-0">
        <Form.Control
          className="textFeedback"
          as="textarea"
          rows="3"
          placeholder="Type your feedback here..."
          value={description}
          onChange={(e) => this.handleChange(e)}
          disabled={inputDisabled}
          type="text"
        />
        <Button
          className="btnFormSend"
          variant="outline-success"
          disabled={isLoading}
          onClick={this.onSubmit}
        >
          {isLoading ? 'Sending...' : 'Send feedback'}
        </Button>
        {isLoading && showTimer && (
          <CancelButton
            showTimer={this.showTimer}
            timerCount={timerCount}
            cancel={this.cancel}
          />
        )}
        {tooShortFeedback && !isLoading && (
          <MyBadge className="badge" variant="warning" message="Your feedback must be more than 10 symbols" />
        )}
        {attemptCount && (
          <MyBadge className="badge" variant="danger" message={tooLong} />
        )}
        {tooLongFeedback && !attemptCount && (
          <MyBadge className="badge" variant="warning" message={tooLong} />
        )}
        {feedbackNotSent && !isLoading && (
          <MyBadge className="badge" variant="danger" message="Your feedback was not sent. Try again" />
        )}
        {feedbackSent && !isLoading && (
          <MyBadge className="badge" variant="success" message="Your feedback was sent!" />
        )}
      </Form.Group>
    );
  }
}

FeedbackSend.propTypes = {
  id: PropTypes.any.isRequired,
  refreshed: PropTypes.any.isRequired,
};

export default FeedbackSend;
