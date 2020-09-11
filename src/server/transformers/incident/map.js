const moment = require('moment');
const geohash = require('ngeohash');
const sortBy = require('lodash/sortBy');
const { dateFormat } = require('./times');

// Add latitude and longitude properties to any object with a geohash property
const addCoordinates = obj => {
  const { latitude, longitude } = geohash.decode(obj.geohash);
  return {
    ...obj,
    latitude,
    longitude,
  };
};

const getMapMarkers = (incident = {}) => {
  const {
    address,
    apparatus,
    description: { type, subtype },
  } = incident;

  // Add lat/lng coordinates from geohashes
  const addressWithCoords = addCoordinates(address);
  const apparatusWithCoords = apparatus.map(addCoordinates);

  // Add map marker for the location of the incident
  const { common_place_name, name, city, state } = addressWithCoords;
  const addressMarker = {
    latitude: addressWithCoords.latitude,
    longitude: addressWithCoords.longitude,
    color: 'red',
    details: {
      title: `${type} - ${subtype}`,
      message: `${name}, ${common_place_name}, ${city}, ${state}`,
      events: [],
    },
  };

  // Add map markers for the responding units
  const apparatusMarkers = apparatusWithCoords.map(app => {
    // Collect all status updates (e.g. "Dispatched"), and sort by time
    // These timestamps are valuable information to convey on the map
    // so that each unit's involvement can be quickly assessed at a glance
    const events = Object.entries(app.unit_status).map(([k, v]) => ({
      eventName: k,
      eventTime: moment(v.timestamp).format(dateFormat),
    }));
    const sortedEvents = sortBy(events, 'eventTime');

    return {
      latitude: app.latitude,
      longitude: app.longitude,
      color: 'blue',
      details: {
        title: `Unit ${app.unit_id} (${app.unit_type}) - Station ${app.station}`,
        message: '',
        events: sortedEvents,
      },
    };
  });

  return {
    // Conceivably, I imagine that there could be multiple incident locations
    // (e.g. large fires or large outdoor gas leaks) In this example, we're only
    // rendering one, but in the wild, you'd allow for multiple. This makes our
    // rendering logic more consistent anyway.
    incidents: [addressMarker],
    responders: apparatusMarkers,
  };
};

module.exports = {
  addCoordinates,
  getMapMarkers,
};
