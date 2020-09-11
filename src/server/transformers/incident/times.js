const moment = require('moment');

const dateFormat = 'MMM DD, YYYY - hh:mm:ssa';

const getDurationInMinutes = (start, end) => {
  const diff = moment(end).diff(start);
  const duration = moment.duration(diff).asMinutes();
  return `${duration.toFixed(2)} minutes`;
};

module.exports = {
  dateFormat,
  getDurationInMinutes,
};
