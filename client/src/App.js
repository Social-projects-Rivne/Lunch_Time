import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { NavigationBar } from './components/NavigationBar';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { ListRestaurant } from './pages/ListRestaurant';
import { Login } from './pages/Login';
import { Registartion } from './pages/Registartion';
import { Map } from './pages/Map';
import { NoMatch } from './pages/NoMatch';


class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>
      
            <NavigationBar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/listRestaurant" component={ListRestaurant} />
              <Route path="/login" component={Login} />
              <Route path="/registartion" component={Registartion} />
              <Route path="/map" component={Map} />
              <Route path="/contact" component={Contact} />
              <Route component={NoMatch} />
            </Switch>
       
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
