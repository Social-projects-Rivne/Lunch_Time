import React, { Component } from 'react';

class About extends Component {
  constructor(props) {
    super(props);
    this.greeting = 'Welcome to LunchTime Application!';
    this.introduce = 'This application is going to save your time while '
      + 'making restaurant order! We have a huge partnership network that'
      + ' allows you to communicate with your favourite restaurant faster and easier!';
    this.benefits = 'LunchTime Application is good if you want to:';
    this.benefit1 = '• see restaurants and events in your city;';
    this.benefit2 = '• see what restaurants in your city have free tables right now;';
    this.benefit3 = '• see restaurants location on the map;';
    this.benefit4 = '• search dishes your like;';
    this.benefit5 = '• make orders online, leave feedback for completed orders;';
    this.benefit6 = '• have access to your personal profile;';
    this.benefit7 = '• and so many features more;';
    this.for_restaurant_owners = 'Finally, if you are restaurant owner, you are welcome'
      + ' to add your restaurant along with its information, menu and events!\n';
    this.the_end = 'Thank you for your choice!';
  }

  render() {
    return (
      <div>
        <div style={{
          position: 'absolute',
          marginTop: 20,
          left: 220,
          right: 220,
          fontSize: 34,
          color: 'white',
          textAlign: 'center',
        }}
        >
          {this.greeting}
        </div>
        <div
          style={{
            position: 'absolute',
            marginTop: 90,
            left: 320,
            right: 320,
            fontSize: 24,
            color: 'white',
            textAlign: 'justify',
          }}
        >
          {this.introduce}
          <br />
          <br />
          {this.benefits}
          <br />
          {this.benefit1}
          <br />
          {this.benefit2}
          <br />
          {this.benefit3}
          <br />
          {this.benefit4}
          <br />
          {this.benefit5}
          <br />
          {this.benefit6}
          <br />
          {this.benefit7}
          <br />
          <br />
          {this.for_restaurant_owners}
        </div>
        <div style={{
          position: 'absolute',
          marginTop: 600,
          left: 220,
          right: 220,
          fontSize: 28,
          color: 'white',
          textAlign: 'center',
        }}
        >
          {this.the_end}
        </div>
      </div>
    );
  }
}

export default About;
