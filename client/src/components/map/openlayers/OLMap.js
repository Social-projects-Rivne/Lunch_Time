import React, {Component} from "react";
import "../../../style/openlayers-styles.css";

import {Map, layer, Layers} from "react-openlayers";

class OLMap extends Component {
  render() {
    return (
      <div className="Map">
        <Map view={{
          center: [55.621927, 30.249233],
          zoom: 2,
          maxZoom: 18,
          minZoom: 4
        }}
        >
          <Layers>
            <layer.Tile/>
          </Layers>
        </Map>
      </div>
    );
  }
}

export default OLMap;
