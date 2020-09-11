import lodashGet from 'lodash/get';
import qs from 'qs';
import React, { Component } from 'react';
import Map from './components/Map';
import Summary from './components/Details';

import './app.css';

export default class App extends Component {
  state = { username: null };

  componentDidMount() {
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
    const mapData = lodashGet(this.state, ['incident', 'mapData'], {});
    const summaryData = lodashGet(this.state, ['incident', 'summaryData'], {});
    const { comments, ...tableSummaryData } = summaryData;
    return (
      <div className="app container">
        <Choose>
          <When condition={this.state.incident}>
            <h1 className="is-size-1">
              Fire Department Incident {summaryData.incident_number}
            </h1>
            <br />
            <section className="columns">
              <Summary className="column is-one-third" {...tableSummaryData} />
              <div className="column is-two-thirds">
                <Map {...mapData} />
                <br />
                <h2 className="is-size-4">Notes</h2>
                <textarea className="is-size-6" readOnly>
                  {comments}
                </textarea>
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
