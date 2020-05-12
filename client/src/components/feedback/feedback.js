import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import FeedbackSend from './send';
import FeedbackComment from './comment';
import '../../styles/feedback.css';
import Api from '../../services/api';
import Auth from '../../services/auth';

class Feedback extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allFeedback: [],
      pieceFeedback: [],
      maxCommentShow: 5,
      start: 0,
      last: 0,
      firstLoad: false,
    };
    this.refresh = this.refresh.bind(this);
  }

  async componentDidMount() {
    const { firstLoad, maxCommentShow, last } = this.state;
    const { id } = this.props;
    const data = await Api.getAllRestaurantFeedback('feedback?restaurantId=', id);

    this.setState(() => {
      if (data === null) {
        return null;
      }
      data.reverse();
      if (!firstLoad) {
        return {
          allFeedback: data,
          pieceFeedback: data.slice(0, maxCommentShow),
        };
      }
      return {
        allFeedback: data,
        pieceFeedback: data.slice(0, last + 1),
      };
    });
  }

  onClickShowMoreComment() {
    const {
      firstLoad, allFeedback, last, maxCommentShow,
    } = this.state;
    if (!firstLoad) {
      this.setState({
        last: last + maxCommentShow,
        firstLoad: true,
      });
    }
    if (allFeedback.length >= last + maxCommentShow) {
      this.setState((prevState) => {
        return {
          pieceFeedback: prevState.allFeedback.slice(prevState.start,
            prevState.last + prevState.maxCommentShow),
          last: prevState.last + prevState.maxCommentShow,
        };
      });
    } else if (allFeedback.length - last > 0) {
      this.setState((prevState) => {
        return {
          pieceFeedback: prevState.allFeedback.slice(prevState.start,
            prevState.last + prevState.maxCommentShow),
          last: allFeedback.length,
        };
      });
    }
  }

  onClickShowLessComment() {
    const { maxCommentShow } = this.state;
    this.setState((prevState) => {
      if (prevState.last - prevState.maxCommentShow > maxCommentShow) {
        return {
          pieceFeedback: prevState.allFeedback.slice(prevState.start,
            prevState.last - prevState.maxCommentShow),
          last: prevState.last - prevState.maxCommentShow,
        };
      }
      return {
        last: 5,
        pieceFeedback: prevState.allFeedback.slice(prevState.start, 5),
      };
    });
  }

  refresh() {
    this.componentDidMount();
  }

  isLogged() {
    return Auth.isAuthenticated();
  }

  render() {
    const stateFeed = this.state;
    const { isAuthenticated } = this.props;
    return (
      <Container className="feedback">
        {this.isLogged() && <FeedbackSend id={this.props.id} refreshed={this.refresh} /> }
        {
          stateFeed.pieceFeedback.map((item) => {
            return (
              <FeedbackComment item={item} key={item.id} isAuthenticated={isAuthenticated} />
            );
          })
        }
        <div className="showComments">
          {this.state.last > 5
          && (
          <span
            className="commSpan"
            tabIndex="0"
            role="button"
            onClick={this.onClickShowLessComment.bind(this)}
            onKeyPress={this.onClickShowLessComment.bind(this)}
          >
            less comments
          </span>
          )}
          {this.state.allFeedback.length > 5 && this.state.last < this.state.allFeedback.length
          && (
            <span
              className="commSpan"
              tabIndex="0"
              role="button"
              onClick={this.onClickShowMoreComment.bind(this)}
              onKeyPress={this.onClickShowMoreComment.bind(this)}
            >
              more comments
            </span>
          )}
        </div>
      </Container>
    );
  }
}

Feedback.propTypes = {
  id: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default Feedback;
