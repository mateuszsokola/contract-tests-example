const { random } = require('lodash');

const MIN_ANNUAL_SALARY = 3500000;  // in cents
const MAX_ANNUAL_SALARY = 8400000;  // in cents
const MULTIPLIER = 140000;          // in cents

function generateSalaryRange() {
    return {
        from: MIN_ANNUAL_SALARY + MULTIPLIER * random(0, 10),
        to: MAX_ANNUAL_SALARY - MULTIPLIER * random(0, 24),
    }
}

module.exports = generateSalaryRange;