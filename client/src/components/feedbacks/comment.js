import React, { Component } from 'react';
import { Container } from 'react-bootstrap'
import '../../style/feedback.css'

class FeedbackComment extends Component {


    render() {

        return (

            <Container className="feedbackUserContainer">
                <img src="/img/defAvatar.png" width="50px" height="50px" alt="defAvava"></img>
                <div className="feedbackMess">
                    <strong className="nameDate">{this.props.item.userName}</strong>
                    <small className="nameDate">{this.props.item.date}</small>
                    <hr className="hrStyle" />
                    <div>{this.props.item.description}</div>
                    <hr className="hrStyle" />
                    <div>

                        <span className="answerToFeedback" title="answer to feedback">answer to</span>
                        <span className="mr-3 likeDislike">
                            <img src="/img/like.png" width="25px" height="25px" alt="like" title="like feedback"></img>
                            <small>{this.props.item.counterLike}</small>
                        </span>
                        <span className="mr-3 likeDislike">
                            <img src="/img/dislike.png" width="25px" height="25px" alt="dislike" title="dislike feedback"></img>
                            <small>{this.props.item.counterDislike}</small>
                        </span>

                        <span className="complaintFeedback">
                            <img src="/img/complaint.png" width="25px" height="25px" alt="complaint" title="complaint feedback"></img>
                        </span>

                    </div>
                </div>
            </Container>


        )
    }
}

export default FeedbackComment;