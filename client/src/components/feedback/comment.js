import React, { Component } from 'react';
import { Container, Image } from 'react-bootstrap';
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
    };
    this.likeFeedback = this.likeFeedback.bind(this);
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

  likeFeedback() {
    Api.post(`feedback/like?feedbackId=${this.props.item.id}&personId=${Person.userInfo.id}`)
      .then((response) => {
        if (response.error == null) {
          const { item } = this.state;
          if (item.id === response.data.id) {
            this.setState({
              item: response.data,
            });
          }
        } else {
          // eslint-disable-next-line no-console
          console.log(response.error);
        }
      });
  }

  render() {
    const { item } = this.state;
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
                src="/img/like.png"
                width="25px"
                height="25px"
                alt="like"
                title="like feedback"
                style={{ cursor: 'pointer' }}
                onClick={this.likeFeedback}
              />
              <small>{item.likes.length}</small>
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
