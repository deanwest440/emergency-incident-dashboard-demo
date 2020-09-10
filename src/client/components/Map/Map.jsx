import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

export default function IncidentMap(props) {
  console.log('\n Got some props: ');
  console.log(props);

  const { markers } = props;
  const position = [37.541885, -77.440624];
  const markerDisplay =
    markers &&
    markers.map(m => (
      <Marker key={JSON.stringify(m)} position={[m.latitude, m.longitude]}>
        <Popup>
          {m.name}
          {m.unit_type}
        </Popup>
      </Marker>
    ));
  return (
    <Map center={position} zoom={13}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
      />
      {markerDisplay}
    </Map>
  );
}
