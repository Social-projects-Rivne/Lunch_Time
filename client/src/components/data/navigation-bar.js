import React from 'react';
import NavigationItem from '../shared/navigation/navigation-item';

const className = 'mr-3';

const data = [
  { link: '/restaurants', name: 'ListRestaurant' },
  { link: '/events', name: 'Events' },
  { link: '/map', name: 'Map' },
  { link: '/about', name: 'About' },
  { link: '/contact', name: 'Contact' },
  { link: '/login', name: 'Login' },
  { link: '/registartion', name: 'Registartion' },
];

const navigationBar = data.map((e) => (
  <NavigationItem
    clName={className}
    link={e.link}
    name={e.name}
  />
));

export default navigationBar;
