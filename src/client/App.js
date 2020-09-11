import lodashGet from 'lodash/get';
import qs from 'qs';
import React, { Component } from 'react';
import Map from './components/IncidentMap';
import Table from './components/Table';

import './app.scss';

export default class App extends Component {
  state = { username: null };

  componentDidMount() {
    // For demonstration purposes, load a default incident
    if (!window.location.search) {
      window.location.search = '?incident=F01705150090';
    }
    const { incident: incidentNumber } = qs.parse(window.location.search, {
      ignoreQueryPrefix: true,
    });
    fetch(`/api/incident/${incidentNumber}`)
      .then(res => res.json())
      .then(incident => {
        this.setState({
          incident,
        });
      });
  }

  render() {
    const mapData = lodashGet(this.state, ['incident', 'map'], {});
    const summary = lodashGet(this.state, ['incident', 'summary'], {});
    return (
      <div className="app container">
        <Choose>
          <When condition={this.state.incident}>
            <h1 className="is-size-2">Emergency Incident Report</h1>
            <p className="is-size-5">
              Incident Number: {summary.incident_number}
            </p>
            <br />
            <section className="columns">
              <div className="column is-one-third">
                <Table title="Incident Summary" rows={summary.details} />
              </div>
              <div className="column is-two-thirds">
                <Map {...mapData} />
                <br />
                <h2 className="is-size-4">Notes</h2>
                <textarea
                  className="is-size-6"
                  readOnly
                  value={summary.notes}
                />
              </div>
            </section>
          </When>
          <Otherwise>
            <p>Loading...</p>
          </Otherwise>
        </Choose>
      </div>
    );
  }
}
