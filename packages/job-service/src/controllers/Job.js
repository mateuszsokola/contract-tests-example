const { findJob, getJobList, setupJobList } = require('../models/JobModel');
const getQueryParams = require('../utils/getQueryParams');

function retrieveJob(req, res) {
    const id = parseInt(req.params.id, 10);
    const slug = req.params.slug;

    const items = findJob(id, slug);

    if (items.length) {
        return res.json(items[0])
    }

    return res.status(404).json({ status: 'NOT_FOUND' })
}

function retrieveJobList(req, res) {
    const params = getQueryParams(req.url);
    const skip = parseInt(params.skip, 10) || 0;
    const amount = parseInt(params.amount, 10) || 25;
    const jobs = getJobList(skip, amount);

    res.status(200).json(jobs);
}

function setupTestData(req, res) {
    setupJobList([
        {
            id: 1,
            slug: 'senior-front-end-developer',
            title: 'Senior Front End Developer',
            createdAt: 'Sat Feb 10 2018 18:12:40 GMT+0100 (CET)',
            salaryFrom: 4340000,
            salaryTo: 5880000,
            city: 'Vienna'
        },{
            id: 2,
            slug: 'senior-php-developer',
            title: 'Senior PHP Developer',
            createdAt: 'Sat Feb 17 2018 14:38:50 GMT+0100 (CET)',
            salaryFrom: 4900000,
            salaryTo: 6580000,
            city: 'Vienna'
        },{
            id: 3,
            slug: 'back-end-architect',
            title: 'Back End Architect',
            createdAt: 'Sat Feb 17 2018 14:22:39 GMT+0100 (CET)',
            salaryFrom: 4060000,
            salaryTo: 6580000,
            city: 'Vienna'
        },{
            id: 4,
            slug: 'ui-developer',
            title: 'UI Developer',
            createdAt: 'Sat Feb 17 2018 14:07:15 GMT+0100 (CET)',
            salaryFrom: 4060000,
            salaryTo: 6720000,
            city: 'Vienna'
        },{
            id: 5,
            slug: 'principal-javascript-manager',
            title: 'Principal JavaScript Manager',
            createdAt: 'Sat Feb 17 2018 14:02:13 GMT+0100 (CET)',
            salaryFrom: 3640000,
            salaryTo: 6160000,
            city: 'Vienna'
        },{
            id: 6,
            slug: 'regular-javascript-engineer',
            title: 'Regular JavaScript Engineer',
            createdAt: 'Sat Feb 17 2018 13:53:12 GMT+0100 (CET)',
            salaryFrom: 4060000,
            salaryTo: 5600000,
            city: 'Vienna'
        } 
    ]);

    return res.status(200).send();
}

module.exports.setupTestData = setupTestData;
module.exports.retrieveJob = retrieveJob;
module.exports.retrieveJobList = retrieveJobList;