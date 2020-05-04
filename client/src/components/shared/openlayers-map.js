import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map, layer, Layers } from 'react-openlayers';
import { Container } from 'react-bootstrap';
import { transform } from 'ol/proj';
import '../../styles/openlayers-map.css';
import * as ol from 'openlayers';
import { Icon, Style } from 'ol/style';

class OpenlayersMap extends Component {
  constructor(props) {
    super(props);
    this.newVector = this.newVector.bind(this);
  }

  newVector() {
    const iconFeature = new ol.Feature(new ol.geom.Point([50.616294, 26.275728]));
    const iconStyle = new Style({
      image: new Icon({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: '../../map-pin-point.png',
      }),
    });
    iconFeature.setStyle(iconStyle);
    const source = new ol.source.Vector({ features: [iconFeature] });
    return (
      <layer.Vector source={source} />
    );
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
            {this.newVector()}
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
