import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavigationBar from './components/navigation-bar';
import Home from './pages/home';
import NoMatch from './pages/no-match';
import routeData from './components/data/navigation-route';
import RouteComponent from './components/shared/navigation/navigation-route';

class App extends Component {
  render() {
    const routes = routeData.map((e) => (
      <RouteComponent
        path={e.path}
        component={e.component}
      />
    ));
    return (
      <Router>
        <NavigationBar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          {routes}
          <Route>
            <NoMatch />
          </Route>
        </Switch>

      </Router>
    );
  }
}

export default App;
