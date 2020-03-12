import React, { Component } from 'react';
import { Container } from 'react-bootstrap'
import FeedbackSend from './send';
import FeedbackComment from './comment'
import axios from 'axios'

class Feedback extends Component{
 

    state = {
        allFedback: [],
        pieceFedback: [],
        maxCommentShow:1,
        start:0,
        last:0

    }

    onClickShowMoreComment(){

        this.setState((prevState)=>{
            return {
                pieceFedback: prevState.allFedback.slice(prevState.start, prevState.last+prevState.maxCommentShow),
                last: prevState.last+prevState.maxCommentShow
            }
        });
    }


    componentDidMount() {

        axios.get('http://localhost:8080/api/feedback/2')
            .then((response) => {
                this.setState({
                    allFedback: response.data,
                    pieceFedback: response.data.slice(this.state.last, this.state.maxCommentShow),
                    last: this.state.maxCommentShow
                })
            });
    }


    render(){

        return (

            <Container className="containerFeedback">
                <FeedbackSend />
                {

                    this.state.pieceFedback.map((item, index) => {
                        return (
                      
                                <FeedbackComment item={item} key={index} />
                            );
                    })
                }

                <div className="showMoreComm">
                    <span className="showMoreCommSpan" onClick={this.onClickShowMoreComment.bind(this)}>
                        show more comment
                    </span>
                </div>

            </Container>
          

        )
    }
}

export default Feedback;