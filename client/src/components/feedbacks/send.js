import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import '../../styles/feedback-send.css';
import PropTypes from 'prop-types';
import Api from '../../services/api';

class FeedbackSend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      val: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    console.log(this.state.val);
    const body = [
      { restaurant_id: this.props.id },
      { feedback: this.state.val },
    ];
    Api.post('feedback', { body })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    this.setState({ val: '' });
  }

  render() {
    return (
      <Form.Group className="m-0">
        <Form.Control
          className="textFeedback"
          as="textarea"
          rows="3"
          placeholder="feedback"
          value={this.state.val}
          onChange={(e) => this.setState({ val: e.target.value })}
          type="text"
        />
        <Button
          className="btnFormSend"
          variant="outline-success"
          onClick={this.onSubmit}
        >
          Send Feedback
        </Button>
      </Form.Group>
    );
  }
}

FeedbackSend.propTypes = {
  id: PropTypes.string.isRequired,
};

export default FeedbackSend;
