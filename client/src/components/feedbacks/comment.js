import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import '../../style/feedback-comment.css';
import PropTypes from 'prop-types';

class FeedbackComment extends Component {
  render() {
    const { item } = this.props;
    return (
      <Container className="feedbackContainer">
        <img src="/img/defAvatar.png" width="50px" height="50px" alt="defAvava" />
        <div className="cooment">
          <strong className="name">{item.userName}</strong>
          <small className="date">{item.date}</small>
          <hr className="hrStyle" />
          <div>{item.description}</div>
          <hr className="hrStyle" />
          <div>

            <span className="answer" title="answer to feedback">answer to</span>
            <span className="mr-3 likeDislike">
              <img src="/img/like.png" width="25px" height="25px" alt="like" title="like feedback" />
              <small>{item.counterLike}</small>
            </span>
            <span className="mr-3 likeDislike">
              <img src="/img/dislike.png" width="25px" height="25px" alt="dislike" title="dislike feedback" />
              <small>{item.counterDislike}</small>
            </span>

            <span className="complaint">
              <img src="/img/complaint.png" width="25px" height="25px" alt="complaint" title="complaint feedback" />
            </span>

          </div>
        </div>
      </Container>


    );
  }
}

FeedbackComment.propTypes = {
  item: PropTypes.object.isRequired,
};


export default FeedbackComment;
