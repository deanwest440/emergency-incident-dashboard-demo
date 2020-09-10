import React, { Component } from 'react';
import Map from './components/Map/Map';
import List from './components/List/List';

import './app.css';

export default class App extends Component {
  state = { username: null };

  componentDidMount() {
    fetch('/api/incidents')
      .then(res => res.json())
      .then(res => {
        console.log(res);
      });
  }

  render() {
    return (
      <div>
        <h1>Fire Department Incidents</h1>
        <section className="map-container">
          <Map />
          <List />
        </section>
      </div>
    );
  }
}
