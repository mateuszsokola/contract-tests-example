const express = require('express');
const path = require('path');

const { retrieveJobList, retrieveJob, setupTestData } = require('./controllers/Job');

const port = 3001;
const app = express();

app.get('/v1', retrieveJobList);
app.get('/v1/:id-:slug', retrieveJob);

if (process.env.NODE_ENV !== 'production') {
    app.post('/setup', setupTestData);
}

app.listen(port, () => {
    console.log('Job Service: Now listening on port', port);
});

module.exports = app;