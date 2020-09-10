import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('map'));

// var myMap = L.map('map').setView([37.541885, -77.440624], 13);

// L.tileLayer(
//   'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
//   {
//     attribution:
//       'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     id: 'mapbox/streets-v11',
//     tileSize: 512,
//     zoomOffset: -1,
//     accessToken:
//       'pk.eyJ1IjoiZGVhbndlc3QxIiwiYSI6ImNrZXd4NTlmMjBlODUycnJvYnowOHNycmkifQ.F9palHZjQiw13ETrr_Luqw',
//   },
// ).addTo(myMap);
// L.marker([37.541885, -77.440624])
//   .bindPopup(
//     '** LOI search completed at 05/15/17 13:19:12 SPECIAL ADDRESS COMMENT: ***RFD: TARGET HAZARD*** ** Case number C201713827 has been assigned to event F01705150050 ** >>>> by: NANCY L. MOREY on terminal: ecc-f1 OLD BOX OF CHEMICALS WANTS IT TO BE CHECKED OUT *****************TAC 3******************* T22/H2/H3 OS - LT FROM T22 HAS CMD',
//   )
//   .addTo(myMap);
