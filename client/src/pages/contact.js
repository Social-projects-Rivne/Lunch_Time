import React, { Component } from 'react';

class Contact extends Component {
  constructor(props) {
    super(props);
    this.greeting = 'We are happy to hear from you!';
    this.line1 = 'Our support team works 24/7!';
    this.line2 = 'Contact us:';
    this.line3 = '+38 (067) 000 00 09';
    this.line4 = 'RV-054 Team';
    this.line5 = '33028 4/6 220 Slovackoho str.';
    this.line6 = 'Rivne city, Ukraine';
    this.message1 = 'If you liked LunchTime App — tell it everybody!';
    this.message2 = 'But if no — tell only us';
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
            textAlign: 'center',
          }}
        >
          {this.line1}
          <br />
          <br />
          {this.line2}
          <br />
          {this.line3}
          <br />
          {this.line4}
          <br />
          {this.line5}
          <br />
          {this.line6}
          <br />
          {this.for_restaurant_owners}
        </div>
        <div style={{
          position: 'absolute',
          marginTop: 420,
          left: 220,
          right: 220,
          fontSize: 14,
          color: 'white',
          textAlign: 'center',
        }}
        >
          {this.message1}
          <br />
          {this.message2}
        </div>
      </div>
    );
  }
}

export default Contact;
