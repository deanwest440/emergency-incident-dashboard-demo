import React from 'react';

function IncidentDetails({ className, ...displayProps }) {
  const detailsDisplay = Object.entries(displayProps).map(([k, v]) => (
    <tr className="columns" key={k}>
      <td className="column is-two-fifths is-capitalized has-text-weight-semibold">
        {`${k}`.replace(/_/g, ' ')}
      </td>
      <td className="column">{v.toString()}</td>
    </tr>
  ));

  return (
    <section className={`component-summary ${className}`}>
      <table className="table is-striped">
        {/* A thead doesn't necessarily make sense here */}
        <tbody>{detailsDisplay}</tbody>
      </table>
    </section>
  );
}

export default IncidentDetails;
