// Transform an object to a series of rows to be rendered by a <Table /> component
const getTableRowsFromObject = obj =>
  Object.entries(obj).map(([name, value]) => ({
    name,
    value,
  }));

module.exports = {
  getTableRowsFromObject,
};
