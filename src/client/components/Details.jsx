import React from 'react';

function IncidentDetails(props) {
  const detailsDisplay = Object.entries(props).map(([k, v]) => (
    <tr key={Math.random()}>
      <td>{k.toString()}</td>
      <td>{v.toString()}</td>
    </tr>
  ));

  return (
    <section className="details">
      <table>
        <thead>
          <tr>
            <td>Key</td>
            <td>Value</td>
          </tr>
        </thead>
        <tbody>{detailsDisplay}</tbody>
      </table>
    </section>
  );
}

export default IncidentDetails;
