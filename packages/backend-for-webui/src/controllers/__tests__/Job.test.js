const path = require('path');
const { Matchers } = require('@pact-foundation/pact');
const { stringify } = require('querystring');

const { retrieveJob, retrieveList } = require('../Job');

// it takes about 4 sec to spin up the mock server
jest.setTimeout(20000);

const JOB_EXPECTED_BODY = {
    id: 1,
    slug: 'senior-front-end-developer',
    title: 'Senior Front End Developer',
    createdAt: 'Sat Feb 10 2018 18:12:40 GMT+0100 (CET)',
    salaryFrom: 4340000,
    salaryTo: 5880000,
    city: 'Vienna'
}

const FIRST_PAGE_BODY = [
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
    }
];

const LAST_PAGE_BODY = [
    {
        id: 6,
        slug: 'regular-javascript-engineer',
        title: 'Regular JavaScript Engineer',
        createdAt: 'Sat Feb 17 2018 13:53:12 GMT+0100 (CET)',
        salaryFrom: 4060000,
        salaryTo: 5600000,
        city: 'Vienna'
    }
];

describe('Job Service', () => {
    beforeAll(() => provider.setup());

    afterAll(() => provider.finalize());
    
    describe('#retrieveJob', () => {

        beforeAll(() => provider.addInteraction({
            state: 'has a requested job offer',
            uponReceiving: 'a request for an job offer with id 1 and slug senior-front-end-developer',
            withRequest: {
                method: 'GET',
                // endpoint on the job service side
                path: '/v1/1-senior-front-end-developer',
                headers: {
                    'Accept': Matchers.somethingLike('application/json')
                }
            },
            willRespondWith: {
                status: 200,
                headers: {
                    'Content-Type': Matchers.somethingLike('application/json')
                },
                body: JOB_EXPECTED_BODY
            }
        }));
    
        beforeAll(() => provider.addInteraction({
            state: 'has no offer matching given criteria',
            uponReceiving: 'a request for a job offer',
            withRequest: {
                method: 'GET',
                // endpoint on the job service side
                path: '/v1/2-non-existent-offer',
                headers: {
                    'Accept': Matchers.somethingLike('application/json')
                }
            },
            willRespondWith: {
                status: 404,
                headers: {
                    'Content-Type': Matchers.somethingLike('application/json')
                },
                body: {
                    status: 'NOT_FOUND'
                }
            }
        }));
    
        it('returns a successful body', async () => {
            const res = {
                status: jest.fn(p => res),
                json: jest.fn(body => body),
            };
            const req = {
                params: {
                    id: '1',
                    slug: 'senior-front-end-developer',
                }
            };
            await retrieveJob(req, res);
            expect(res.json).toBeCalledWith(JOB_EXPECTED_BODY);
        });
    
        it('returns a not found response', async () => { 
            const res = {
                status: jest.fn(p => res),
                json: jest.fn(body => body),
            };
            const req = {
                params: {
                    id: '2',
                    slug: 'non-existent-offer',
                }
            };
            await retrieveJob(req, res);
            expect(res.status).toBeCalledWith(404);
            expect(res.json).toBeCalledWith({ status: 'NOT_FOUND'});
        });
    });

    describe('#retrieveList', () => {
        beforeAll(() => provider.addInteraction({
            state: 'has 5 job offers',
            uponReceiving: 'a request for the first 5 job offers',
            withRequest: {
                method: 'GET',
                // endpoint on the job service side
                path: '/v1',
                query: stringify({
                    skip: 0,
                    amount: 5,
                }),
                headers: {
                    'Accept': Matchers.somethingLike('application/json')
                }
            },
            willRespondWith: {
                status: 200,
                headers: {
                    'Content-Type': Matchers.somethingLike('application/json')
                },
                body: FIRST_PAGE_BODY
            }
        }));

        beforeAll(() => provider.addInteraction({
            state: 'has 1 more job offer',
            uponReceiving: 'a request for 5 job offers skipping first 5',
            withRequest: {
                method: 'GET',
                // endpoint on the job service side
                path: '/v1',
                query: stringify({
                    skip: 5,
                    amount: 5,
                }),
                headers: {
                    'Accept': Matchers.somethingLike('application/json')
                }
            },
            willRespondWith: {
                status: 200,
                headers: {
                    'Content-Type': Matchers.somethingLike('application/json')
                },
                body: LAST_PAGE_BODY
            }
        }));

        it('returns the first 5 job offers', async () => {
            const res = {
                status: jest.fn(p => res),
                json: jest.fn(body => body),
            };
            const req = {
                url: 'http://localhost:/3001/v1?skip=0&amount=5'
            };
            await retrieveList(req, res);
            expect(res.json).toBeCalledWith(FIRST_PAGE_BODY);
        });

        it('returns 1 more job offer skipping the first 5', async () => {
            const res = {
                status: jest.fn(p => res),
                json: jest.fn(body => body),
            };
            const req = {
                url: 'http://localhost:/3001/v1?skip=5&amount=5'
            };
            await retrieveList(req, res);
            expect(res.json).toBeCalledWith(LAST_PAGE_BODY);
        });
    });

    it('successfully verifies', () => provider.verify())
})