const getSummaryDetails = require('./summary');
const getWeatherConditions = require('./weather');
const { getMapMarkers } = require('./map');

// Augments and transforms an incident entry
// In the real world, there may be extensive transformations that happen
// at this stage, which may require the use of microservices or APIs
const incidentTransformer = async incident => {
  const weather_conditions = await getWeatherConditions(incident);
  return {
    // Map data (markers and their associated details)
    map: {
      markers: getMapMarkers(incident),
    },
    // This is data that's not (necessarily) related to the map
    summary: {
      incident_number: incident.description.incident_number,
      details: getSummaryDetails(incident),
      notes: incident.description.comments,
    },
    weather_conditions,
  };
};

module.exports = incidentTransformer;
