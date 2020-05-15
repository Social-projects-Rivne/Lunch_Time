import React, { Component } from 'react';
import {
  Container, Image, Badge,
} from 'react-bootstrap';
import '../../styles/feedback-comment.css';
import PropTypes from 'prop-types';
import Api from '../../services/api';
import Auth from '../../services/auth';

class FeedbackComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.item,
      avatar: '/img/default-avatar.png',
    };
    this.personId = Auth.getPersonId();
    this.likeFeedback = this.likeFeedback.bind(this);
    this.dislikeFeedback = this.dislikeFeedback.bind(this);
    this.unAuthorizedTrue = this.unAuthorizedTrue.bind(this);
  }

  componentDidMount() {
    this.getAvatar(this.props.item.personId);
  }

  getAvatar(personId) {
    Api.getImage(`image/profile/${personId}`)
      .then((response) => {
        if (response.error == null) {
          this.setState({
            avatar: `data:image/jpg;base64,${response.data}`,
          });
        }
      });
  }

  likeFeedback() {
    Api.post(`feedback/like?feedbackId=${this.props.item.id}&personId=${this.personId}`)
      .then((response) => {
        if (response.status === 201) {
          if (this.state.item.id === response.data.id) {
            this.setState((prevState) => {
              const item = { ...prevState.item };
              item.likes = response.data.likes;
              item.dislikes = response.data.dislikes;
              return { item };
            });
          }
        } else {
          setTimeout(() => {
            this.setState({
              unexpectedError: false,
            });
          }, 3000);
          this.setState({
            unexpectedError: true,
          });
        }
      });
  }

  dislikeFeedback() {
    Api.post(`feedback/dislike?feedbackId=${this.props.item.id}&personId=${this.personId}`)
      .then((response) => {
        if (response.status === 201) {
          if (this.state.item.id === response.data.id) {
            this.setState((prevState) => {
              const item = { ...prevState.item };
              item.likes = response.data.likes;
              item.dislikes = response.data.dislikes;
              return { item };
            });
          }
        } else {
          setTimeout(() => {
            this.setState({
              unexpectedError: false,
            });
          }, 3000);
          this.setState({
            unexpectedError: true,
          });
        }
      });
  }

  unAuthorizedTrue() {
    const currentCallId = Math.random();
    setTimeout(() => {
      if (currentCallId !== this.state.currentCallId) return;
      this.setState({
        unAuthorized: false,
      });
    }, 3000);
    this.setState({
      unAuthorized: true,
      currentCallId,
    });
  }

  render() {
    const { item, unexpectedError, unAuthorized } = this.state;
    const { isAuthenticated } = this.props;
    const likeTitle = isAuthenticated ? 'like feedback' : 'You need to login to like feedback';
    const dislikeTitle = isAuthenticated ? 'dislike feedback' : 'You need to login to dislike feedback';
    const onLikeClick = isAuthenticated ? this.likeFeedback : this.unAuthorizedTrue;
    const onDislikeClick = isAuthenticated ? this.dislikeFeedback : this.unAuthorizedTrue;
    const likeImage = item.likes.indexOf(this.personId) >= 0 ? '/img/like.png' : '/img/like-empty.png';
    const dislikeImage = item.dislikes.indexOf(this.personId) >= 0 ? '/img/dislike.png' : '/img/dislike-empty.png';
    return (
      <Container className="feedbackContainer">
        <Image src={this.state.avatar} width="50px" height="50px" alt="defAvava" roundedCircle />
        <div className="comment">
          <strong className="name">{item.personName}</strong>
          <small className="date">
            {
              `${item.date.substring(8, 10)}/${item.date.substring(5, 7)}/${item.date.substring(0, 4)}`
              + ` ${item.date.substring(11, 16)}`
            }
          </small>
          <hr className="hrStyle" />
          <div>{item.description}</div>
          <hr className="hrStyle" />
          <div>
            <span className="mr-3 likeDislike">
              {/* eslint-disable-next-line max-len */}
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
              <img
                src={likeImage}
                width="25px"
                height="25px"
                alt="like"
                title={likeTitle}
                style={{ cursor: 'pointer' }}
                onClick={onLikeClick}
              />
              <small>{item.likes.length > 0 ? item.likes.length : ''}</small>
            </span>
            <span className="mr-3 likeDislike">
              {/* eslint-disable-next-line max-len */}
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
              <img
                src={dislikeImage}
                width="25px"
                height="25px"
                alt="dislike"
                title={dislikeTitle}
                style={{ cursor: 'pointer' }}
                onClick={onDislikeClick}
              />
              <small>{item.dislikes.length > 0 ? item.dislikes.length : ''}</small>
            </span>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            {unAuthorized && (
            <Badge
              variant="warning"
              style={{
                marginLeft: 25,
                fontSize: 14,
                height: 24,
                width: 290,
              }}
            >
              You need to login to like/dislike feedback
            </Badge>
            )}
            {unexpectedError && (
              <Badge
                variant="warning"
                style={{
                  marginLeft: 25,
                  fontSize: 14,
                  height: 24,
                  width: 326,
                }}
              >
                Your action can&apos;t be done now. Try again later
              </Badge>
            )}
          </div>
        </div>
      </Container>


    );
  }
}

FeedbackComment.propTypes = {
  item: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};


export default FeedbackComment;
