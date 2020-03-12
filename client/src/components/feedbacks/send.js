import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import '../../style/feedback.css';

class FeedbackSend extends Component {
  render() {
    return (

      <Form.Group className="m-0">
        <Form.Control className="textAreaFeedback" as="textarea" rows="3" placeholder="feedback" />
        <Button className="btnFormSend" variant="outline-success">Send Feedback</Button>
      </Form.Group>


    );
  }
}

export default FeedbackSend;
