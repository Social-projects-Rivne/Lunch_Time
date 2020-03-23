import React, { Component } from 'react';
import OpenlayersMap from '../components/shared/openlayers-map';
import { latitude, longitude } from '../components/info/map';

class Map extends Component {
  render() {
    return (
      <OpenlayersMap latitude={latitude} longitude={longitude} />
    );
  }
}

export default Map;
