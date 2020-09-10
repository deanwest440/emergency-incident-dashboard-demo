const geohash = require('ngeohash');

const getApparatusMarkers = apparatus =>
  apparatus.map(a => {
    const { latitude, longitude } = geohash.decode(a.geohash);
    const marker_type = ['apparatus'].concat(a.unit_type);
  });
