import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import FeedbackSend from './send';
import FeedbackComment from './comment';
import '../../style/feedback.css';
import Api from '../../services/api';


class Feedback extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allFeedback: [],
      pieceFeedback: [],
      maxCommentShow: 1,
      start: 0,
      last: 0,
    };
  }

  async componentDidMount() {
    const { id } = this.props;
    const data = await Api.getAllRestaurantFeedback('feedback?restaurantId=', id);

    this.setState((prevState) => {
      if (data == null) {
        return null;
      }
      return {
        allFeedback: data,
        pieceFeedback: data.slice(prevState.last, prevState.maxCommentShow),
        last: prevState.maxCommentShow,
      };
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
            show more comments
          </span>
        </div>

      </Container>


    );
  }
}

Feedback.propTypes = {
  id: PropTypes.string.isRequired,
};


export default Feedback;
