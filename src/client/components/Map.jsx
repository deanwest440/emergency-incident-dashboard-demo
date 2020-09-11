import React from 'react';
import PropTypes from 'prop-types';
import {
  Map,
  Marker,
  Popup,
  TileLayer,
  LayersControl,
  LayerGroup,
} from 'react-leaflet';

function IncidentMap(props) {
  console.log('\n Got some props: ');
  console.log(props);

  const { markers } = props;
  const position = [37.541885, -77.440624];
  const markerDisplay = markers.map(m => {
    console.log('\n Processing Marker: ');
    console.log(m);
    return (
      <Marker key={Math.random()} position={[m.latitude, m.longitude]}>
        <Popup>
          <h2>{m.details.title}</h2>
          <p>{m.details.message}</p>
        </Popup>
      </Marker>
    );
  });
  return (
    <Map center={position} zoom={13}>
      <LayersControl position="topright">
        <LayersControl.Overlay name="Points of interest" checked>
          <LayerGroup>{markerDisplay}</LayerGroup>
        </LayersControl.Overlay>
      </LayersControl>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
      />
    </Map>
  );
}

IncidentMap.propTypes = {
  markers: PropTypes.arrayOf(PropTypes.object),
};

IncidentMap.defaultProps = {
  markers: [],
};

export default IncidentMap;
