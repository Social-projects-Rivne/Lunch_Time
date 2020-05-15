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
      selectedPlace: {},
    };
    this.onMauseover = this.onMauseover.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
    this.onInfoWindowClose = this.onInfoWindowClose.bind(this);
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
    const { showingInfoWindow } = this.state;
    if (showingInfoWindow) {
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
    const {
      restaurants, showingInfoWindow,
      activeMarker, selectedPlace,
    } = this.state;
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
        {restaurants.map((restaurant) => {
          return (
            <Marker
              key={restaurant.id}
              id={restaurant.id}
              position={{
                lat: restaurant.latitude,
                lng: restaurant.longitude,
              }}
              name={restaurant.name}
              time={`Working time: ${restaurant.workingTime}`}
              address={`Adress: ${restaurant.textAddress}`}
              label={restaurant.name}
              onMouseover={this.onMauseover}
              onFocus={this.onMauseover}
            />
          );
        })}
        <InfoWindow
          marker={activeMarker}
          visible={showingInfoWindow}
          onClose={this.onInfoWindowClose}
        >
          <div>
            <h4>{selectedPlace.name}</h4>
            <h4>{selectedPlace.time}</h4>
            <h4>{selectedPlace.address}</h4>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

MapContainer.propTypes = {
  google: PropTypes.object.isRequired,
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyC9hCinmzSqS5zom2_aDEKm3808cg57ohQ',
})(MapContainer);
