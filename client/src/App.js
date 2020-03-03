import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import ListRestaurant from './pages/ListRestaurant';
import Login from './pages/Login';
import Registartion from './pages/Registartion';
import Map from './pages/Map';
import NoMatch from './pages/NoMatch';


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
          <Route path="/listRestaurant">
            <ListRestaurant />
          </Route>
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
          <Route>
            <NoMatch />
          </Route>
        </Switch>

      </Router>
    );
  }
}

export default App;
