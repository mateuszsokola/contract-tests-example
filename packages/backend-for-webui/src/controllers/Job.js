const axios = require('axios');
const getQueryParams = require('../utils/getQueryParams');

const serviceUrl = 'http://localhost:3001';
const endpoint = '/v1';
const timeout = 1000;

async function retrieveJob(req, res) {
    try {
        const id = parseInt(req.params.id, 10);
        const slug = req.params.slug;
    
        // example: http://localhost:3001/v1/1-senior-back-end-developer
        const url = `${serviceUrl}${endpoint}/${id}-${slug}`;
        const response = await axios.get(url, { timeout });
        const item = response.data;

        return res.json(item);
    }
    catch (error) {
        if (error.response) {
            return res.status(error.response.status).json({ status: 'NOT_FOUND' })
        } 
        console.log('Error', error.message);

        return res.status(500).json({ status: 'ERROR' })
    }
}

async function retrieveList(req, res) {
    try {
        const params = getQueryParams(req.url);
        const skip = parseInt(params.skip, 10) || 0;
        const amount = parseInt(params.amount, 10) || 25;
    
        // example: http://localhost:3001/v1
        const url = `${serviceUrl}${endpoint}`;
        const response = await axios.get(url, { 
            params: {
                skip, 
                amount
            },
            timeout 
        });

        const items = response.data;
        return res.json(items)
    }
    catch (error) {
        if (error.response) {
            return res.status(error.response.status).json({ status: 'NOT_FOUND' })
        } 
        console.log('Error', error.message);

        return res.status(500).json({ status: 'ERROR' })
    }
}

module.exports.retrieveJob = retrieveJob;
module.exports.retrieveList = retrieveList;