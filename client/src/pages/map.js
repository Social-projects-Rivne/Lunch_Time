import React, { Component } from 'react';
import {
  Map, GoogleApiWrapper, Marker, InfoWindow,
} from 'google-maps-react';
import PropTypes from 'prop-types';
import { latitude, longitude } from '../components/info/map';
import Api from '../services/api';

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: [],
    };
    this.onMauseover = this.onMauseover.bind(this);
  }

  componentDidMount() {
    this.getAll('restaurants/all');
  }

  onMauseover(props, marker) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  }

  onMapClicked() {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  }

  onInfoWindowClose() {
    this.setState({
      activeMarker: null,
      showingInfoWindow: false,
    });
  }

  getAll(path) {
    Api.get(path)
      .then((response) => {
        if (response.error) {
        // eslint-disable-next-line no-console
          console.error(response);
          return;
        }
        this.setState({
          restaurants: response.data,
        });
      });
  }

  render() {
    const mapStyles = {
      width: '100%',
      height: '100%',
    };
    if (!this.props.google) return <div>Loading...</div>;
    return (
      <Map
        className="map"
        google={this.props.google}
        zoom={12}
        maxZoom={18}
        minZoom={4}
        style={mapStyles}
        onClick={this.onMapClicked}
        initialCenter={{ lat: latitude, lng: longitude }}
      >
        {this.state.restaurants.map((restaurant) => {
          return (
            <Marker
              key={restaurant.id}
              id={restaurant.id}
              position={{
                lat: restaurant.latitude,
                lng: restaurant.longitude,
              }}
              name={[[restaurant.name], <br />, ['Working hours: ', restaurant.workingTime],
                <br />, ['Adress: ', restaurant.textAddress]]}
              label={restaurant.name}
              onMouseover={this.onMauseover}
              onFocus={this.onMauseover}
            />
          );
        })}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onInfoWindowClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

MapContainer.propTypes = {
  google: PropTypes.element.isRequired,
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyC9hCinmzSqS5zom2_aDEKm3808cg57ohQ',
})(MapContainer);
