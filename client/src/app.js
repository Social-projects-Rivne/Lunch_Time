import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavigationBar from './components/navigation-bar';
import FooterBar from './components/footer-bar';
import Home from './pages/home';
import About from './pages/about';
import Contact from './pages/contact';
import RestaurantList from './pages/restaurant-list';
import Login from './pages/login';
import Registration from './pages/registration';
import Map from './pages/map';
import NoMatch from './pages/no-match';
import Events from './pages/events';
import Restaurant from './components/restaurant/restaurant-item';
import Profile from './components/profile/profile';

class App extends Component {
  render() {
    return (
      <Router>
        <NavigationBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/events" component={Events} />
          <Route path="/restaurants/:id" component={Restaurant} />
          <Route path="/restaurants" component={RestaurantList} />
          <Route path="/login" component={Login} />
          <Route path="/registration" component={Registration} />
          <Route path="/map" component={Map} />
          <Route path="/contact" component={Contact} />
          <Route path="/profile" component={Profile} />
          <Route path="" component={NoMatch} />
        </Switch>
        <FooterBar />

      </Router>
    );
  }
}

export default App;
