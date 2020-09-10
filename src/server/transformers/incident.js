const geohash = require('ngeohash');

const addCoordinates = (obj) => {
  const { latitude, longitude } = geohash.decode(obj.geohash);
  return {
    ...obj,
    latitude,
    longitude,
  };
};

// Augments and transforms an incident entry
// In the real world, there may be extensive transformations that happen
// at this stage, which may require the use of microservices
const incidentTransformer = (incident) => {
  const { address, apparatus } = incident;

  // Add lat/lng coordinates from geohashes
  const transformedAddress = addCoordinates(address);
  const transformedApparatus = apparatus.map(addCoordinates);

  return {
    ...incident,
    address: transformedAddress,
    apparatus: transformedApparatus,
  };
};

module.exports = incidentTransformer;
