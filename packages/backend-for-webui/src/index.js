const express = require('express');
const cors = require('cors');
const path = require('path');

const { retrieveList, retrieveJob } = require('./controllers/Job');

const port = 8080;
const app = express();

app.use(cors());

app.get('/v1/jobs', retrieveList);
app.get('/v1/job/:id-:slug', retrieveJob);

app.listen(port, () => {
    console.log('BFF: Now listening on port', port);
});