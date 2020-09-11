import React from 'react';
import PropTypes from 'prop-types';

function Table({ title, rows }) {
  // For each key/value pair supplied in the summary details, render a table row.
  const detailsDisplay = rows.map(({ name, value }) => (
    <tr className="columns" key={name}>
      <td className="column is-two-fifths is-capitalized has-text-weight-semibold">
        {/* Replace underscores with spaces, so "incident_type" -> "incident type" */}
        {`${name}`.replace(/_/g, ' ')}
      </td>
      <td className="column summary-data">{value}</td>
    </tr>
  ));

  return (
    <section>
      <h2 className="is-size-4">{title}</h2>
      <br />
      <table className="table is-striped">
        {/* A thead doesn't necessarily make sense here */}
        <tbody>{detailsDisplay}</tbody>
      </table>
    </section>
  );
}

Table.propTypes = {
  title: PropTypes.string,
  rows: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
};

Table.defaultProps = {
  title: '',
};

export default Table;
