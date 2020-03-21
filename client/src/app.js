import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavigationBar from './components/shared/navigation/navigation-bar';
import RouteComponent from './components/shared/navigation/navigation-route';
import Home from './pages/home';
import NoMatch from './pages/no-match';
import info from './components/info/rotes';

class App extends Component {
  render() {
    const routeLinks = info.map((e) => (
      <RouteComponent
        path={e.path}
        component={e.component}
        key={e.path}
      />
    ));
    return (
      <Router>
        <NavigationBar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          {routeLinks}
          <Route>
            <NoMatch />
          </Route>
        </Switch>

      </Router>
    );
  }
}

export default App;
