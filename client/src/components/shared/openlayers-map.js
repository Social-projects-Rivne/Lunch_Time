import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map, layer, Layers } from 'react-openlayers';
import { Container } from 'react-bootstrap';
import { transform } from 'ol/proj';
import '../../styles/openlayers-map.css';

class OpenlayersMap extends Component {
  render() {
    const { latitude, longitude } = this.props;
    return (
      <Container className="map-container">
        <Map view={{
          center: transform([longitude, latitude],
            'EPSG:4326', 'EPSG:3857'),
          zoom: 12,
          maxZoom: 18,
          minZoom: 4,
        }}
        >
          <Layers>
            <layer.Tile />
          </Layers>
        </Map>
      </Container>
    );
  }
}

OpenlayersMap.defaultProps = {
  latitude: 'search-container pt-4',
  longitude: 'mb-3',
};

OpenlayersMap.propTypes = {
  latitude: PropTypes.string,
  longitude: PropTypes.string,
};

export default OpenlayersMap;
