import React, { Component } from "react";
import mapboxgl from "mapbox-gl";
import { EditMapProps } from "../models";

const api_token =
  "pk.eyJ1Ijoic3RlaW5rbGF0cmUiLCJhIjoiY2tkajEzb2tjMGFnNDMybzB6YnJoOWV3ZSJ9.IKb0brXr269EUis2xTsh4w";
const mapStyle = "mapbox://styles/mapbox/streets-v11?optimize=true";

class EditMap extends Component<EditMapProps, any> {
  constructor(props: EditMapProps) {
    super(props);
    this.state = {
      latitude: this.props.latitude,
      longitude: this.props.longitude,
    };
  }

  componentDidMount() {
    if (this.state.latitude && this.state.longitude) this.generateMap();
  }

  generateMap = () => {
    var map = new mapboxgl.Map({
      accessToken: api_token,
      container: "map",
      style: mapStyle,
      center: [this.state.longitude, this.state.latitude],
      zoom: 15,
    });

    new mapboxgl.Marker()
      .setLngLat([this.state.longitude, this.state.latitude])
      .addTo(map);

    return map;
  };

  render() {
    return <div id="map" style={{ width: "500px", height: "300px" }}></div>;
  }
}

export default EditMap;
