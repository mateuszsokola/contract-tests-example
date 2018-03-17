# contract-tests-example [![Build Status](https://travis-ci.org/mateuszsokola/contract-tests-example.svg?branch=master)](https://travis-ci.org/mateuszsokola/contract-tests-example)


# How to run?
```
npm i
npm test
```

# How to run tests for Job Service ?
```
cd packages/job-service
node src/index.js &         # server must be running to verify provider
npm run test:provider
```
