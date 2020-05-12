import React, { Component } from 'react';
import OpenlayersMap from '../components/shared/openlayers-map';
import { latitude, longitude } from '../components/info/map';
// import Api from '../services/api';

class Map extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     restaurants: [],
  //   };
  // }

  // componentDidMount() {
  //   this.getAll('restaurants/all');
  // }

  // getAll(path) {
  //   Api.get(path)
  //     .then((response) => {
  //       if (response.error) {
  //         // eslint-disable-next-line no-console
  //         console.error(response);
  //         return;
  //       }
  //       this.setState({
  //         restaurants: response.data,
  //       });
  //     });
  // }

  render() {
    // const { restaurants } = this.state;
    return (
      <OpenlayersMap latitude={latitude} longitude={longitude} />
    );
  }
}

export default Map;
