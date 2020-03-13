import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import FeedbackSend from './send';
import FeedbackComment from './comment';
import '../../style/feedback.css';

class Feedback extends Component {
  constructor() {
    super();

    this.state = {
      allFeedback: [],
      pieceFeedback: [],
      maxCommentShow: 1,
      start: 0,
      last: 0,
    };
  }

  componentDidMount() {
    axios.get('http://localhost:8080/api/feedback/2')
      .then((response) => {
        this.setState((prevState) => {
          return {
            allFeedback: response.data,
            pieceFeedback: response.data.slice(prevState.last, prevState.maxCommentShow),
            last: prevState.maxCommentShow,
          };
        });
      });
  }

  onClickShowMoreComment() {
    this.setState((prevState) => {
      return {
        pieceFeedback: prevState.allFeedback.slice(prevState.start, prevState.last + prevState.maxCommentShow),
        last: prevState.last + prevState.maxCommentShow,
      };
    });
  }

  onKey() {
    this.onClickShowMoreComment();
  }

  render() {
    const stateFeed = this.state;

    return (

      <Container className="feedback">
        <FeedbackSend />
        {
                    stateFeed.pieceFeedback.map((item) => {
                      return (
                        <FeedbackComment item={item} key={item.id} />
                      );
                    })
                }

        <div className="showComments">
          <span
            className="commSpan"
            tabIndex="0"
            role="button"
            onClick={this.onClickShowMoreComment.bind(this)}
            onKeyPress={this.onKey.bind(this)}
          >
            show more comment
          </span>
        </div>

      </Container>


    );
  }
}

export default Feedback;
