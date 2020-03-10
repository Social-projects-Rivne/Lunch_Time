import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
<<<<<<< HEAD:client/src/app.js
import NavigationBar from './components/navigation-bar';
import Home from './pages/home';
import About from './pages/about';
import Contact from './pages/contact';
import ListRestaurant from './pages/restaurant-list';
import Login from './pages/login';
import Registartion from './pages/registartion';
import Map from './pages/map';
import NoMatch from './pages/no-match';
import Restaurant from './components/restaurant-item';
=======
import NavigationBar from './components/NavigationBar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import ListRestaurant from './pages/ListRestaurant';
import Login from './pages/Login';
import Registartion from './pages/Registartion';
import Map from './pages/Map';
import NoMatch from './pages/NoMatch';

import Feedback from './components/feedback'

>>>>>>> feature_9_feedbacks_rybacuk:client/src/App.js

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
<<<<<<< HEAD:client/src/app.js
          <Route>
=======
          <Route >
            {/* Temporarily  in feedback we put rest. id*/}
            <Feedback /> 
          </Route>
          <Route >
>>>>>>> feature_9_feedbacks_rybacuk:client/src/App.js
            <NoMatch />
          </Route>
        </Switch>

      </Router>
    );
  }
}

export default App;
