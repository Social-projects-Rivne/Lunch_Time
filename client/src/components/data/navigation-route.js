import React from 'react';
import RouteComponent from '../shared/navigation-route';
import About from '../../pages/about';
// import Restaurant from '../restaurant-item';
// import ListRestaurant from '../../pages/restaurant-list';
import Login from '../../pages/login';
import Registartion from '../../pages/registartion';
import Map from '../../pages/map';
import Contact from '../../pages/contact';
import Events from '../../pages/events';

const data = [
  { path: '/about', component: <About /> },
  { path: '/events', component: <Events /> },
  //  { path: '/restaurants', component: <Restaurant match="id" /> },
  //  { path: '/restaurants', component: <ListRestaurant  match={}/> },
  { path: '/map', component: <Map /> },
  { path: '/login', component: <Login /> },
  { path: '/registartion', component: <Registartion /> },
  { path: '/contact', component: <Contact /> },
];

const route = data.map((e) => (
  <RouteComponent
    path={e.path}
    component={e.component}
  />
));

export default route;
