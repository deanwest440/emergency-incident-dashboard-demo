const moment = require('moment');
const { getHourlyReports } = require('../../services/weather');
const { getTableRowsFromObject } = require('../util');

// Return hourly weather report for the hour the incident was opened
const getFilteredHourlyReports = async (startTime, endTime) => {
  // Get all hourly reports (typically at least an entire day's worth because of Meteostat's date precision)
  const hourlyReports = await getHourlyReports(startTime, endTime);

  // Format the incident open date to match the hourly formats coming from MeteoStat
  const hourlyFormat = `YYYY-MM-DD HH:00:00`;
  const hourIncidentOpened = moment(startTime).format(hourlyFormat);

  // Only return the most relevant hourly report
  return hourlyReports.filter(
    ({ time_local }) => time_local === hourIncidentOpened,
  )[0];
};

// Americanizing things :P
// Perhaps these could've gone into another file where they'd be reusable
const toFarenheit = celsiusTemp => (celsiusTemp * 1.8 + 32).toFixed(2);
const toMph = kph => parseInt(kph * 0.6213712, 10);

// Pick out key information and make it more human-readable (and American-friendly)
const tranformHourlyReport = report => ({
  temperature: `${toFarenheit(report.temp)} F`,
  dew_point: `${toFarenheit(report.dwpt)} F`,
  wind_speed: `${toMph(report.wspd)} mph`,
  relative_humidity: `${report.rhum}%`,
  snow_depth: report.snow || 0,
});

const getWeatherConditions = async (incident = {}) => {
  const {
    description: { event_opened, event_closed },
  } = incident;

  // Get the most relevant individual hourly report for the incident
  const hourlyReport = await getFilteredHourlyReports(
    event_opened,
    event_closed,
  );

  // Make the hourly report more human-readable (and American-friendly)
  const transformedHourlyReport = tranformHourlyReport(hourlyReport);

  // Prepare the weather report to be rendered by our <Table /> component.
  return getTableRowsFromObject(transformedHourlyReport);
};

module.exports = getWeatherConditions;
