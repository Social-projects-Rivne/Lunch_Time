import React from 'react';
import About from '../../pages/about';
import Restaurant from '../shared/restaurant/restaurant-item';
import ListRestaurant from '../../pages/restaurant-list';
import Login from '../../pages/login';
import Registartion from '../../pages/registartion';
import Map from '../../pages/map';
import Contact from '../../pages/contact';
import Events from '../../pages/events';

const routeData = [
  { path: '/about', component: <About /> },
  { path: '/events', component: <Events /> },
  { path: '/restaurants/:id', component: <Restaurant match={{ params: '' }} /> },
  { path: '/restaurants', component: <ListRestaurant match={{ path: 'restaurants' }} /> },
  { path: '/map', component: <Map /> },
  { path: '/login', component: <Login /> },
  { path: '/registartion', component: <Registartion /> },
  { path: '/contact', component: <Contact /> },
];

export default routeData;
