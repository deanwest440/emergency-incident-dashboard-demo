const geohash = require('ngeohash');

const addCoordinates = obj => {
  const { latitude, longitude } = geohash.decode(obj.geohash);
  return {
    ...obj,
    latitude,
    longitude,
  };
};

module.exports = addCoordinates;
