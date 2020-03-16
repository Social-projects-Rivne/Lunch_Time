import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavigationBar from './components/navigation-bar';
import Home from './pages/home';
import About from './pages/about';
import Contact from './pages/contact';
import ListRestaurant from './pages/restaurant-list';
import Login from './pages/login';
import Registartion from './pages/registartion';
import Map from './pages/map';
import NoMatch from './pages/no-match';
import Events from './pages/events';
import Restaurant from './components/restaurant-item';
import Profile from './components/profile';

class App extends Component {
  render() {
    return (
      <Router>


        <NavigationBar />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/events">
            <Events />
          </Route>
          <Route path="/restaurants/:id" component={Restaurant} />
          <Route path="/restaurants" component={ListRestaurant} />
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/registartion">
            <Registartion />
          </Route>
          <Route path="/map">
            <Map />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/profile" component={Profile} />
          <Route>
            <NoMatch />
          </Route>
        </Switch>

      </Router>
    );
  }
}

export default App;
