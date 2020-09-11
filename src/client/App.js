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

    console.log('Map Data: ');
    console.log(mapData);
    return (
      <div>
        <h1>Fire Department Incidents</h1>
        <section className="map-container">
          <Map {...mapData} />
          <Summary {...summaryData} />
        </section>
      </div>
    );
  }
}
