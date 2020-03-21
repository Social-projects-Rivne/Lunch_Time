import React from 'react';
import About from '../../pages/about';
import Restaurant from '../shared/restaurant/restaurant-item';
import ListRestaurant from '../../pages/restaurant-list';
import Login from '../../pages/login';
import Registration from '../../pages/registration';
import Map from '../../pages/map';
import Contact from '../../pages/contact';
import Events from '../../pages/events';
import Profile from '../profile';

const info = [
  { path: '/about', component: <About /> },
  { path: '/events', component: <Events /> },
  { path: '/restaurants/:id', component: <Restaurant match={{ params: '' }} /> },
  { path: '/restaurants', component: <ListRestaurant match={{ path: '/restaurants' }} /> },
  { path: '/map', component: <Map /> },
  { path: '/login', component: <Login /> },
  { path: '/registration', component: <Registration /> },
  { path: '/contact', component: <Contact /> },
  { path: '/profile', component: <Profile location={{ pathname: 'profile/info' }} /> },
];

export default info;
