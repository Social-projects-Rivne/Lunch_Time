import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

class RouteComponent extends Component {
  render() {
    const { path, component } = this.props;
    return (
      <Route path={path}>
        {component}
      </Route>
    );
  }
}

RouteComponent.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.object.isRequired,
};

export default RouteComponent;
