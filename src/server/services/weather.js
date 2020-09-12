const axios = require('axios');
const moment = require('moment');

// Get hourly reports for a given time range.
const getHourlyReports = async (startTime, endTime) => {
  // Request Details
  const stationId = 72401; // Richmond International Airport
  const meteoStatDateFmt = 'YYYY-MM-DD'; // Would be nicer to have more precision here :-O
  const start = moment(startTime).format(meteoStatDateFmt);
  const end = moment(endTime).format(meteoStatDateFmt);
  const timezone = 'America/New_York';

  // This obviously should be stored in a more secure place like Secrets Manager
  const apiKey = 'kIt4z6BQligSoKxv7yyVIWWzYYKyGOH6';

  // Get hourly results from MeteoStat
  const res = await axios.get(
    `https://api.meteostat.net/v2/stations/hourly?station=${stationId}&start=${start}&end=${end}&tz=${timezone}`,
    {
      headers: {
        'x-api-key': apiKey,
      },
    },
  );
  const {
    data: { data: hourlyReports },
  } = res;

  return hourlyReports;
};

// You'd probably have lots handy weather methods you exported here
module.exports = { getHourlyReports };
