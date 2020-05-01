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
import NewOrder from './components/order/new-order';
import Auth from './services/auth';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
    };
  }

  componentDidMount() {
    if (Auth.isAuthenticated()) {
      this.setState({
        isAuthenticated: true,
      });
    }
  }

  handleLogin() {
    this.setState({ isAuthenticated: true });
  }

  handleLogout() {
    this.setState({ isAuthenticated: false }, () => {
      Auth.removeToken();
    });
  }

  render() {
    const { isAuthenticated } = this.state;

    return (
      <Router>
        <NavigationBar isAuthenticated={isAuthenticated} logoutHandler={() => { this.handleLogout(); }} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/events" component={Events} />
          <Route exact path="/restaurants/:id/new-order" component={NewOrder} />
          <Route
            exact
            path="/restaurants/:id"
            render={(routeProps) => {
              return <Restaurant isAuthenticated={isAuthenticated} {...routeProps} />;
            }}
          />
          <Route exact path="/restaurants" component={RestaurantList} />
          <Route
            exact
            path="/login"
            render={(routeProps) => {
              return <Login loginHandler={() => { this.handleLogin(); }} {...routeProps} />;
            }}
          />
          <Route
            exact
            path="/registration"
            render={(routeProps) => {
              return <Registration loginHandler={() => { this.handleLogin(); }} {...routeProps} />;
            }}
          />
          <Route exact path="/map" component={Map} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/profile/info" component={Profile} />
          <Route component={NoMatch} />
        </Switch>
        <FooterBar />
      </Router>
    );
  }
}

export default App;
