import lodashGet from 'lodash/get';
import React, { Component } from 'react';
import Map from './components/Map';
import Summary from './components/Details';

import './app.css';

export default class App extends Component {
  state = { username: null };

  componentDidMount() {
    fetch('/api/incident/F01705150050')
      .then(res => res.json())
      .then(incident => {
        this.setState({
          incident,
        });
      });
  }

  render() {
    const mapData = lodashGet(this.state, ['incident', 'mapData']);
    const summaryData = lodashGet(this.state, ['incident', 'summaryData']);

    return (
      <div className="app">
        <h1 className="is-size-1">
          Fire Department Incident {summaryData && summaryData.incident_number}
        </h1>
        <br />
        <section className="columns">
          <Summary className="column is-one-third" {...summaryData} />
          <Map className="column is-two-thirds" {...mapData} />
        </section>
      </div>
    );
  }
}
