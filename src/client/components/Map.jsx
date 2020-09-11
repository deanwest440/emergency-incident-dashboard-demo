import React from 'react';
import PropTypes from 'prop-types';
import {
  Map,
  Marker,
  Popup,
  TileLayer,
  LayersControl,
  LayerGroup,
} from 'react-leaflet';

function IncidentMap({ markers, className }) {
  // Center the Map at the Average Lat/Lng of all markers
  const averageMarkerPosition = markers
    .reduce(
      (acc, m) => {
        return [acc[0] + m.latitude, acc[1] + m.longitude];
      },
      [0, 0],
    )
    .map(coord => coord / markers.length);

  const markerDisplay = markers.map(m => {
    return (
      <Marker
        key={[m.latitude, m.longitude] + Math.random()}
        position={[m.latitude, m.longitude]}
      >
        <Popup>
          <h2>{m.details.title}</h2>
          <p>{m.details.message}</p>
        </Popup>
      </Marker>
    );
  });
  return (
    <Map
      className={`component-map ${className}`}
      center={averageMarkerPosition}
      zoom={12}
    >
      <LayersControl position="topright">
        <LayersControl.Overlay name="Points of interest" checked>
          <LayerGroup>{markerDisplay}</LayerGroup>
        </LayersControl.Overlay>
      </LayersControl>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
      />
    </Map>
  );
}

IncidentMap.propTypes = {
  markers: PropTypes.arrayOf(PropTypes.object),
};

IncidentMap.defaultProps = {
  markers: [
    {
      latitude: 0,
      longitude: 0,
      details: {},
    },
  ],
};

export default IncidentMap;
