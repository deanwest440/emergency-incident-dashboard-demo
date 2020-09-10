import React, { Component } from 'react';
import Map from './components/Map/Map';
import List from './components/List/List';

import './app.css';

export default class App extends Component {
  state = { username: null };

  componentDidMount() {
    fetch('/api/incident/F01705150090')
      .then(res => res.json())
      .then(incident => {
        console.log('Response from API: ');
        console.log(incident);
        const markers = [incident.address, ...incident.apparatus];
        this.setState({
          incident: {
            ...incident,
            markers,
          },
        });
      });
  }

  render() {
    console.log('this.state.incident: ');
    console.log(this.state.incident);
    return (
      <div>
        <h1>Fire Department Incidents</h1>
        <section className="map-container">
          <Map {...this.state.incident} />
          <List />
        </section>
      </div>
    );
  }
}
