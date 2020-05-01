import React, { Component } from 'react';
import '../styles/about.css';

class About extends Component {
  render() {
    return (
      <article className="about">
        <h1 className="text-center">Welcome to LunchTime Application!</h1>
        <p>
          This application is going to save your time while making restaurant order!
          We have a huge partnership network that allows you to communicate with your
          favorite restaurant faster and easier!
        </p>
        <h3>LunchTime Application is good if you want to:</h3>
        <ul>
          <li>see restaurants and events in your city;</li>
          <li>see what restaurants in your city have free tables right now;</li>
          <li>see restaurants location on the map;</li>
          <li>search dishes your like;</li>
          <li>make orders online, leave feedback for completed orders;</li>
          <li>have access to your personal profile;</li>
          <li>and so many features more;</li>
        </ul>
        <p>
          Finally, if you are restaurant owner, you are welcome
          to add your restaurant along with its information, menu and events!
        </p>
        <p>Thank you for your choice!</p>
      </article>
    );
  }
}

export default About;
