import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Map, layer, Layers, custom,
} from 'react-openlayers';
import { Container } from 'react-bootstrap';
import { transform } from 'ol/proj';
import '../../styles/openlayers-map.css';
import * as ol from 'openlayers';

class OpenlayersMap extends Component {
  constructor(props) {
    super(props);
    const iconFeature = new ol.Feature(new ol.geom.Point(transform([26.275728, 50.616294], 'EPSG:4326', 'EPSG:3857')));
    const iconFeature1 = new ol.Feature(new ol.geom.Point(transform([26.260064, 50.618261], 'EPSG:4326', 'EPSG:3857')));
    const iconFeature2 = new ol.Feature(new ol.geom.Point(transform([26.241863, 50.620219], 'EPSG:4326', 'EPSG:3857')));
    const iconFeature3 = new ol.Feature(new ol.geom.Point(transform([26.253994, 50.616146], 'EPSG:4326', 'EPSG:3857')));
    const iconFeature4 = new ol.Feature(new ol.geom.Point(transform([26.252249, 50.618318], 'EPSG:4326', 'EPSG:3857')));
    const source = new ol.source.Vector({
      features: [iconFeature, iconFeature1, iconFeature2,
        iconFeature3, iconFeature4],
    });
    const marker = new custom.style.MarkerStyle();
    this.state = {
      sour: source,
      mark: marker,
    };
  }

  // addFeatures(){
  // const {restaurants } = this.props;
  // const points = restaurants.map(restaurant => {
  // var point = {};
  // point[restaurant.id] = new ol.Feature(new ol.geom.Point(transform([restaurant.longitude,
  // restaurant.latitude], 'EPSG:4326', 'EPSG:3857')));
  // return point;
  // })
  // const points = restaurants.map((restaurant) => {return (
  // new ol.Feature(new ol.geom.Point(transform([restaurant.longitude, restaurant.latitude], 'EPSG:4326', 'EPSG:3857')))
  // );});
  // return points;
  // }

  render() {
    const { latitude, longitude } = this.props;
    const { sour, mark } = this.state;

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
            <layer.Vector source={sour} style={mark.style} zIndex="1" />
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
  // restaurants: PropTypes.array.isRequired,
};

export default OpenlayersMap;
