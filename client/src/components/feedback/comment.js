import React, { Component } from 'react';
import {
  Container, Image, Badge, Toast,
} from 'react-bootstrap';
import '../../styles/feedback-comment.css';
import PropTypes from 'prop-types';
import Api from '../../services/api';
import Person from '../../services/person';

class FeedbackComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.item,
      avatar: '/img/default-avatar.png',
      unexpectedError: false,
    };
    this.likeFeedback = this.likeFeedback.bind(this);
    this.unAuthorizedTrue = this.unAuthorizedTrue.bind(this);
  }

  componentDidMount() {
    this.getAvatar(this.props.item.person);
  }

  getAvatar(user) {
    if (user && user.photoUrl && user.photoUrl.length) {
      Api.getImage(`image/profile/${user.id}`)
        .then((response) => {
          if (response.error == null) {
            this.setState({
              avatar: `data:image/jpg;base64,${response.data}`,
            });
          }
        });
    }
  }

  setShow(flag) {
    this.setState({
      unexpectedError: flag,
    });
  }

  likeFeedback() {
    Api.post(`feedback/like?feedbackId=${this.props.item.id}&personId=${Person.userInfo.id}`)
      .then((response) => {
        if (response.status === 201) {
          if (this.state.item.id === response.data.id) {
            this.setState((prevState) => {
              const item = { ...prevState.item };
              item.likes = response.data.likes;
              return { item };
            });
          }
        } else {
          this.setState({
            unexpectedError: true,
          });
        }
      });
  }

  unAuthorizedTrue() {
    this.setState({
      unAuthorized: true,
    });
  }


  render() {
    const { item, unexpectedError, unAuthorized } = this.state;
    const { isAuthenticated } = this.props;
    const title = isAuthenticated ? 'like feedback' : 'You need to login to like feedback';
    const onClick = isAuthenticated ? this.likeFeedback : this.unAuthorizedTrue;

    const likeImage = item.likes.indexOf(Person.userInfo.id) >= 0 ? '/img/like.png' : '/img/like-empty.png';
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

            <span className="answer" title="answer to feedback">answer to</span>
            <span className="mr-3 likeDislike">

              {/* eslint-disable-next-line max-len */}
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
              <img
                src={likeImage}
                width="25px"
                height="25px"
                alt="like"
                title={title}
                style={{ cursor: 'pointer' }}
                onClick={onClick}
              />
              <small>{item.likes.length > 0 ? item.likes.length : ''}</small>
            </span>
            <span className="mr-3 likeDislike">
              <img src="/img/dislike.png" width="25px" height="25px" alt="dislike" title="dislike feedback" />
              <small>{item.counterDislike}</small>
            </span>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            {unAuthorized && (
            <Badge
              variant="warning"
              style={{
                marginLeft: 25,
                fontSize: 14,
                height: 24,
                width: 260,
              }}
            >
              You need to login to like feedback
            </Badge>
            )}
            <Toast
              onClose={() => this.setShow(!unexpectedError)}
              show={unexpectedError}
              delay={3000}
              autohide
              style={{ display: 'inline-flex', color: 'black' }}
            >
              <Toast.Body>Error message</Toast.Body>
            </Toast>
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
  isAuthenticated: PropTypes.bool.isRequired,
};


export default FeedbackComment;
