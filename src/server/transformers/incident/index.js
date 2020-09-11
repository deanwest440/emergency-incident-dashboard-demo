const pick = require('lodash/pick');
const moment = require('moment');
const addCoordinates = require('./add-coordinates');

const getMapMarkers = incident => {
  const { address, apparatus } = incident;

  // Add lat/lng coordinates from geohashes
  const addressWithCoords = addCoordinates(address);
  const apparatusWithCoords = apparatus.map(addCoordinates);

  const {
    address_line_1,
    common_place_name,
    name,
    city,
    state,
  } = addressWithCoords;

  // Map Data
  const addressMarker = {
    latitude: addressWithCoords.latitude,
    longitude: addressWithCoords.longitude,
    details: {
      title: `${common_place_name} ${address_line_1}, ${name}, ${city}, ${state}`,
      message: 'This is the message that goes with the address marker',
    },
  };

  const apparatusMarkers = apparatusWithCoords.map(app => {
    return {
      latitude: app.latitude,
      longitude: app.longitude,
      details: {
        title: `Unit ${app.unit_id} (${app.unit_type}) - Station ${app.station}`,
        message: `You're the man now dawg.`,
      },
    };
  });

  return [].concat(addressMarker, apparatusMarkers);
};

const dateFormat = 'MMM DD, YYYY - hh:mm:ssa';

const getDurationInMinutes = (start, end) => {
  const diff = moment(end).diff(start);
  const duration = moment.duration(diff).asMinutes();
  return `${duration.toFixed(2)} minutes`;
};

const transformDescription = ({
  type,
  subtype,
  incident_number,
  event_id,
  event_opened,
  event_closed,
  first_unit_dispatched,
  first_unit_enroute,
  first_unit_arrived,
  comments,
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
    incident_number,
    event_id,
    event_opened: moment(event_opened).format(dateFormat),
    event_closed: moment(event_closed).format(dateFormat),
    total_event_minutes,
    first_unit_dispatched: moment(first_unit_dispatched).format(dateFormat),
    first_unit_enroute: moment(first_unit_enroute).format(dateFormat),
    first_unit_arrived: moment(first_unit_arrived).format(dateFormat),
    first_unit_enroute_minutes,
    first_unit_arrived_minutes,
    comments,
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

  return {
    // Map data (markers and their associated details)
    mapData: {
      markers: getMapMarkers(incident),
    },
    // This is data that's not (necessarily) related to the map
    summaryData: {
      ...transformedDescription,
      ...transformedFireDept,
    },
  };
};

module.exports = incidentTransformer;
