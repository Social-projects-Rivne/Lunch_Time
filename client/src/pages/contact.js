import React, { Component } from 'react';
import '../styles/contact.css';

class Contact extends Component {
  render() {
    return (
      <article className="contact">
        <h3>
          Write your issues or wishes in
          {' '}
          <a href="https://github.com/Social-projects-Rivne/Lunch_Time">GitHub</a>
        </h3>
      </article>
    );
  }
}

export default Contact;
