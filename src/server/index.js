const express = require('express');
const app = express();
const db = require('./db');
const incidentTransformer = require('./transformers/incident');

app.use(express.static('dist'));

// In the real world, you wouldn't list out your
// API endpoints and transformers in the main app file.
// Rather, you'd separate routes from app startup routines
app.get('/api/incidents', (req, res) => {
  const summaries = Object.entries(db).map(([, v]) => v.description);
  res.send(summaries);
});
app.get('/api/incident/:id', (req, res) => {
  const incident = db[req.params.id];
  if (!incident) {
    res.send(404);
  }
  const transformedIncident = incidentTransformer(incident);
  res.send(transformedIncident);
});

app.listen(process.env.PORT || 8080, () =>
  console.log(`Listening on port ${process.env.PORT || 8080}!`),
);
