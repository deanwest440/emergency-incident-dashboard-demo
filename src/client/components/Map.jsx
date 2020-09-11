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

const getAverageCoords = markerList =>
  markerList
    .reduce(
      (acc, m) => {
        return [acc[0] + m.latitude, acc[1] + m.longitude];
      },
      [0, 0],
    )
    .map(coord => coord / markerList.length);

const getMarkerDisplay = markerList =>
  markerList.map(m => (
    <Marker
      key={[m.latitude, m.longitude] + Math.random()}
      position={[m.latitude, m.longitude]}
    >
      <Popup>
        <h2>{m.details.title}</h2>
        <p>{m.details.message}</p>
      </Popup>
    </Marker>
  ));

function IncidentMap({ markers: { incidents, responders }, className }) {
  // Center the Map at the Average Lat/Lng of all markers
  const averageIncidentCoords = getAverageCoords(incidents);
  const incidentMarkers = getMarkerDisplay(incidents);
  const responderMarkers = getMarkerDisplay(responders);

  return (
    <Map
      className={`component-map ${className}`}
      center={averageIncidentCoords}
      zoom={12}
    >
      <LayersControl position="topright">
        <LayersControl.Overlay name="Incident Locations" checked>
          <LayerGroup>{incidentMarkers}</LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Responders" checked>
          <LayerGroup>{responderMarkers}</LayerGroup>
        </LayersControl.Overlay>
      </LayersControl>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
      />
    </Map>
  );
}

const markerShape = PropTypes.shape({
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  details: PropTypes.shape({
    title: PropTypes.string,
    message: PropTypes.string,
  }),
});

IncidentMap.propTypes = {
  markers: PropTypes.shape({
    incidents: PropTypes.arrayOf(markerShape),
    responders: PropTypes.arrayOf(markerShape),
  }),
  className: PropTypes.string,
};

const defaultMarker = {
  latitude: 0,
  longitude: 0,
  details: {},
};

IncidentMap.defaultProps = {
  className: '',
  markers: {
    incidents: [defaultMarker],
    responders: [defaultMarker],
  },
};

export default IncidentMap;
