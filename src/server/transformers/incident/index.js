const moment = require('moment');
const sortBy = require('lodash/sortBy');
const addCoordinates = require('./add-coordinates');

const dateFormat = 'MMM DD, YYYY - hh:mm:ssa';

const getMapMarkers = incident => {
  const {
    address,
    apparatus,
    description: { type, subtype },
  } = incident;

  // Add lat/lng coordinates from geohashes
  const addressWithCoords = addCoordinates(address);
  const apparatusWithCoords = apparatus.map(addCoordinates);

  const { common_place_name, name, city, state } = addressWithCoords;

  // Map Data
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

  const apparatusMarkers = apparatusWithCoords.map(app => {
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
    // Conceivably, there could be multiple incident locations
    incidents: [addressMarker],
    responders: apparatusMarkers,
  };
};

const getDurationInMinutes = (start, end) => {
  const diff = moment(end).diff(start);
  const duration = moment.duration(diff).asMinutes();
  return `${duration.toFixed(2)} minutes`;
};

const transformDescription = ({
  type,
  subtype,
  event_id,
  event_opened,
  event_closed,
  first_unit_dispatched,
  first_unit_enroute,
  first_unit_arrived,
}) => {
  const total_event_minutes = getDurationInMinutes(event_opened, event_closed);
  const first_unit_enroute_minutes = getDurationInMinutes(
    first_unit_dispatched,
    first_unit_enroute,
  );
  const first_unit_arrived_minutes = getDurationInMinutes(
    first_unit_dispatched,
    first_unit_arrived,
  );
  return {
    incident_type: `${type} - ${subtype}`,
    event_id,
    event_opened: moment(event_opened).format(dateFormat),
    event_closed: moment(event_closed).format(dateFormat),
    total_event_minutes,
    first_unit_dispatched: moment(first_unit_dispatched).format(dateFormat),
    first_unit_enroute: moment(first_unit_enroute).format(dateFormat),
    first_unit_arrived: moment(first_unit_arrived).format(dateFormat),
    first_unit_enroute_minutes,
    first_unit_arrived_minutes,
  };
};

const transformFireDeptDetails = ({ name, fd_id, shift, state, timezone }) => ({
  responding_fire_dept: `${name} (Fire Department ID ${fd_id})`,
  fire_dept_shift: shift,
  fire_dept_state: state,
  fire_dept_timezone: timezone,
});

// Augments and transforms an incident entry
// In the real world, there may be extensive transformations that happen
// at this stage, which may require the use of microservices
const incidentTransformer = incident => {
  const { description, fire_department } = incident;
  const transformedDescription = transformDescription(description);
  const transformedFireDept = transformFireDeptDetails(fire_department);

  const summaryDetails = Object.entries({
    ...transformedDescription,
    ...transformedFireDept,
  }).map(([name, value]) => ({
    name,
    value,
  }));

  return {
    // Map data (markers and their associated details)
    map: {
      markers: getMapMarkers(incident),
    },
    // This is data that's not (necessarily) related to the map
    summary: {
      incident_number: description.incident_number,
      details: summaryDetails,
      notes: description.comments,
    },
  };
};

module.exports = incidentTransformer;
