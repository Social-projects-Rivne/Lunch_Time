import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavigationBar from './components/navigation-bar';
import Home from './pages/home';
import NoMatch from './pages/no-match';
import route from './components/data/navigation-route';

class App extends Component {
  render() {
    return (
      <Router>


        <NavigationBar />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          {route}
          <Route>
            <NoMatch />
          </Route>
        </Switch>

      </Router>
    );
  }
}

export default App;
