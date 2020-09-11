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
import mapIcons from '../map-icons';

// Get the average lat/lng for a list of coords
// This could be used to center the map between a series of markers
const getAverageCoords = markerList =>
  markerList
    .reduce(
      (acc, m) => {
        return [acc[0] + m.latitude, acc[1] + m.longitude];
      },
      [0, 0],
    )
    .map(coord => coord / markerList.length);

// Render a list of markers, each of which includes lat/long coordinates
// as well as popups that appear onClick. The popups contain titles, messages,
// and chronological events that pertain to the incident or responders
const getMarkerDisplay = markerList =>
  markerList.map(m => {
    return (
      <Marker
        key={`${m.details.title}-${m.latitude}-${m.longitude}`}
        position={[m.latitude, m.longitude]}
        icon={mapIcons[m.color] || mapIcons.blue}
      >
        <Popup>
          <h2 className="is-size-6">{m.details.title}</h2>
          <p>{m.details.message}</p>
          <If condition={m.details.events.length > 0}>
            <ul>
              {m.details.events.map(({ eventName, eventTime }) => (
                <li>
                  <span className="is-capitalized has-text-weight-semibold">
                    {eventName}
                  </span>
                  {': '}
                  {eventTime}
                </li>
              ))}
            </ul>
          </If>
        </Popup>
      </Marker>
    );
  });

// Note: ideally, this component would just be a general "Map" and not necessarily
// have any concept of what an "incident" is. Also, ideally, the functions above
// would be abstracted away to keep this component file more concise
function IncidentMap({ markers: { incidents, responders } }) {
  // Center the Map at the Average Lat/Lng of all incident markers
  const averageIncidentCoords = getAverageCoords(incidents);

  // Render Incidents and Responders as separate layers
  const incidentMarkers = getMarkerDisplay(incidents);
  const responderMarkers = getMarkerDisplay(responders);

  return (
    <Map center={averageIncidentCoords} zoom={12}>
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
  color: PropTypes.string,
  details: PropTypes.shape({
    title: PropTypes.string,
    message: PropTypes.string,
    events: PropTypes.arrayOf(PropTypes.object),
  }),
});

IncidentMap.propTypes = {
  markers: PropTypes.shape({
    incidents: PropTypes.arrayOf(markerShape),
    responders: PropTypes.arrayOf(markerShape),
  }).isRequired,
};

export default IncidentMap;
