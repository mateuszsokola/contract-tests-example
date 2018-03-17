const { random } = require('lodash');

const JobId = require('./jobId');
const generateSalaryRange = require('./generateSalaryRange');
const generateJobTitle = require('./generateTitle');

function generateDate() {
    return new Date(Date.now() - random(1, 1000 * 3600 * 24 * 15)).toString()
}

function titleToSlug(title) {
    return title.split(' ')
        .map((word) => word.toLocaleLowerCase())
        .join('-');
}

function generateJob() {
    const title = generateJobTitle();
    const salary = generateSalaryRange();

    return {
        id: JobId().nextId(),
        slug: titleToSlug(title),
        title,
        createdAt: generateDate(),
        salaryFrom: salary.from,
        salaryTo: salary.to,
        city: 'Vienna',
    };
}

module.exports = generateJob;