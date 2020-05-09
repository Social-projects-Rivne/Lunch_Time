import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Map, layer, Layers, custom,
} from 'react-openlayers';
import { Container } from 'react-bootstrap';
import { transform } from 'ol/proj';
import '../../styles/openlayers-map.css';
import * as ol from 'openlayers';

const iconFeature = new ol.Feature(new ol.geom.Point(transform([26.275728, 50.616294], 'EPSG:4326', 'EPSG:3857')));
const source = new ol.source.Vector({ features: [iconFeature] });
const marker = new custom.style.MarkerStyle('/img/map-pin-point.png');

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
            <layer.Vector source={source} style={marker.style} zIndex="2" />
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
