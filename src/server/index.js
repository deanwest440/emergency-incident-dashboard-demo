const express = require('express');
const db = require('./mock-db');
const incidentTransformer = require('./transformers/incident');

const app = express();
app.use(express.static('dist'));

// In the real world, you wouldn't list out your
// API endpoints and transformers in the main app file.
// Rather, you'd separate routes from app startup routines

// This endpoint isn't used for this demo, but ideally we would populate
// the UI with a list of incidents so that the user can select the ones of interest
app.get('/api/incidents', (req, res) => {
  const summaries = Object.entries(db).map(([, v]) => v.description);
  res.send(summaries);
});

// Get an individual incient by ID (e.g. F01705150090) or return a 404 if not found
app.get('/api/incident/:id', (req, res) => {
  const incident = db[req.params.id];
  if (!incident) {
    res.sendStatus(404);
  }
  // Transform the incident before returning. Ordinarily, if there were extensive
  // transformations and augmentations required here, this transformer may aggregate
  // details from multiple micro-services or APIs. For example, we can enrich the
  // original data with weather data, additional geospatial data, traffic data, etc.
  const transformedIncident = incidentTransformer(incident);
  res.send(transformedIncident);
});

app.listen(process.env.PORT || 8080, () =>
  console.log(`Listening on port ${process.env.PORT || 8080}!`),
);
