import React, { Component } from "react";
import { EditMapProps } from "../models";
import { InteractiveMap } from "react-map-gl";

class EditMap extends Component<EditMapProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      lng: 5,
      lat: 34,
      zoom: 2,
    };
  }

  render() {
    return (
      <div>
        {this.props.address}
        <InteractiveMap
          width="500px"
          height="300px"
          latitude={0}
          longitude={0}
          zoom={2}
          bearing={0}
          pitch={0}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          // onLoad={onMapLoad}
          // onViewportChange={setViewport}
          mapboxApiAccessToken="pk.eyJ1Ijoic3RlaW5rbGF0cmUiLCJhIjoiY2tkajEzb2tjMGFnNDMybzB6YnJoOWV3ZSJ9.IKb0brXr269EUis2xTsh4w"
        >
          {/* {children} */}
        </InteractiveMap>
      </div>
    );
  }
}

export default EditMap;
