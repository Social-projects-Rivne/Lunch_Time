import React, { Component } from 'react';
import { Map, layer, Layers } from 'react-openlayers';
import { Container } from 'react-bootstrap';
import { transform } from 'ol/proj';
import '../style/openlayers-styles.css';

class OpenlayersMap extends Component {
  render() {
    return (
      <Container className="map-container">
        <Map view={{
          center: transform([26.249249, 50.621957],
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

export default OpenlayersMap;
