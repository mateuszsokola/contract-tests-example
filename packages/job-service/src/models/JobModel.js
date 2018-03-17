const generateJob = require('../utils/jobGenerator');

const AMOUNT_OF_JOBS = 2000;

// generates 2000 random job offers, sorted by date.
let jobs = [...Array(AMOUNT_OF_JOBS)].map(() => generateJob()).sort((jobA, jobB) => {
    const dateA = new Date(jobA.createdAt);
    const dateB = new Date(jobB.createdAt);

    return dateB.getTime() - dateA.getTime();
});

function findJob(id, slug) {
    return jobs.filter((j) => id === j.id && slug === j.slug);
}

function getJobList(skip = 0, amount = 100) {
    const offset = skip + amount;
    return jobs.slice(skip, offset);
}

function setupJobList(newJobs) {
    jobs = newJobs;
}

module.exports.findJob = findJob;
module.exports.getJobList = getJobList;
module.exports.setupJobList = setupJobList;
