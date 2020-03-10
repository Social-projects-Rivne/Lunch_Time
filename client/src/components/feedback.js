import React, { Component } from 'react';
import { Container } from 'react-bootstrap'
import FeedbackSend from './feedback-send';
import FeedbackComment from './feddback-comment'
import axios from 'axios'

class feedback extends Component{

    state = {
        feedback: []
    }


    componentDidMount(){

        // Temporarily we get id from rest.
        axios.get('http://localhost:8080/api/feedback/2') 
        .then((response) => {
            this.setState({
                feedback: response.data
            })
           });
        }


    render(){


        return (
            <Container className="containerFeedback">
                <FeedbackSend />
                {
                    this.state.feedback.map((item, index) => {
                        return (<FeedbackComment item={item} key={index} />);
                    })
                }
            </Container>

        )
    }
}

export default feedback;