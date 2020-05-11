import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Map, layer, Layers, custom,
} from 'react-openlayers';
import { Container } from 'react-bootstrap';
import { transform } from 'ol/proj';
import '../../styles/openlayers-map.css';
import * as ol from 'openlayers';

const iconFeature1 = new ol.Feature(new ol.geom.Point(transform([26.235728, 50.616294], 'EPSG:4326', 'EPSG:3857')));
const iconFeature2 = new ol.Feature(new ol.geom.Point(transform([26.275728, 50.616294], 'EPSG:4326', 'EPSG:3857')));
// const iconStyle = new ol.style.Style({
// image: new ol.style.Icon({
// anchor: [0.5, 46],
// anchorXUnits: 'fraction',
// anchorYUnits: 'pixels',
// src: '/img/map-marker.png',
// }),
// });
// iconFeature.setStyle(iconStyle);
const source1 = new ol.source.Vector({ features: [iconFeature1] });
const source2 = new ol.source.Vector({ features: [iconFeature2] });
const marker = new custom.style.MarkerStyle('/img/map-pin-point.png');

class OpenlayersMap extends Component {
  addFeatures() {
    const { restaurants } = this.props;
    const points = restaurants.map((restaurant) => {
      const point = {};
      point[restaurant.id] = new ol.Feature(new ol.geom.Point(transform([restaurant.longitude,
        restaurant.latitude], 'EPSG:4326', 'EPSG:3857')));
      return point;
    });
    return points;
  }

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
            <layer.Vector source={source1} style={marker.style} zIndex="1" />
            <layer.Vector source={source2} style={marker.style} zIndex="1" />
          </Layers>
          {/* <Overlays>
<Overlay ref={comp => this.overlayComp = comp}>
<custom.Popup ref={comp => this.popupComp = comp}>
</custom.Popup>
</Overlay>
</Overlays> */}
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
  restaurants: PropTypes.any.isRequired,
};

export default OpenlayersMap;
