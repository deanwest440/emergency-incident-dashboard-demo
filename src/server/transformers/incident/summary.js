const moment = require('moment');
const { getDurationInMinutes, dateFormat } = require('./times');
const { getTableRowsFromObject } = require('../util');

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

// Return a list of name / transformed value pairs for key details about incident
const getSummaryDetails = incident => {
  const description = transformDescription(incident.description);
  const fire_dept = transformFireDeptDetails(incident.fire_department);

  // Prepare the summary details to be rendered by our <Table /> component.
  return getTableRowsFromObject({
    ...description,
    ...fire_dept,
  });
};

module.exports = getSummaryDetails;
