import { Matchers } from '@pact-foundation/pact';

import fetchJob from '../fetchJob';
import fetchJobList from '../fetchJobList';

// it takes about 4 sec to spin up the mock server
jest.setTimeout(20000);

describe('Services', () => {
    beforeAll(() => provider.setup());

    afterAll(() => provider.finalize());

    describe('fetchJob', () => {
        const OFFER_BODY = {
            id: 1,
            slug: 'senior-front-end-developer',
            title: 'Senior Front End Developer',
            createdAt: 'Sat Feb 10 2018 18:12:40 GMT+0100 (CET)',
            salaryFrom: 4340000,
            salaryTo: 5880000,
            city: 'Vienna'
        };

        beforeAll(() => provider.addInteraction({
            state: 'has a job offer',
            uponReceiving: 'a request for an job offer with id 1 and slug senior-front-end-developer',
            withRequest: {
                method: 'GET',
                // endpoint on the back-end for web-ui side
                path: '/v1/job/1-senior-front-end-developer',
                headers: {
                    'Accept': Matchers.somethingLike('application/json')
                }
            },
            willRespondWith: {
                status: 200,
                headers: {
                    'Content-Type': Matchers.somethingLike('application/json')
                },
                body: OFFER_BODY
            }
        }));

        beforeAll(() => provider.addInteraction({
            state: 'has no job offer',
            uponReceiving: 'a request for non existent job',
            withRequest: {
                method: 'GET',
                // endpoint on the back-end for web-ui side
                path: '/v1/job/2-non-existent-offer',
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

        it('returns a job offer', async () => {
            const response = await fetchJob({ id: '1', slug: 'senior-front-end-developer'});
            expect(response).toEqual(OFFER_BODY);
        });

        it('returns a error', async () => {
            try {
                await fetchJob({ id: '2', slug: 'non-existent-offer'});
                // this should never triggered
                expect(true).toBeFalsy();
            }
            catch (error) {
                const { response } = error;
                expect(response.status).toEqual(404);
                expect(response.data).toEqual({ status: 'NOT_FOUND' });
            }
        });
    });

    describe('fetchJobList', () => {
        const LIST_BODY = [
            {
                id: 1,
                slug: 'senior-front-end-developer',
                title: 'Senior Front End Developer',
                createdAt: 'Sat Feb 10 2018 18:12:40 GMT+0100 (CET)',
                salaryFrom: 4340000,
                salaryTo: 5880000,
                city: 'Vienna'
            }, {
                id: 2,
                slug: 'senior-php-developer',
                title: 'Senior PHP Developer',
                createdAt: 'Sat Feb 17 2018 14:38:50 GMT+0100 (CET)',
                salaryFrom: 4900000,
                salaryTo: 6580000,
                city: 'Vienna'
            }, {
                id: 3,
                slug: 'back-end-architect',
                title: 'Back End Architect',
                createdAt: 'Sat Feb 17 2018 14:22:39 GMT+0100 (CET)',
                salaryFrom: 4060000,
                salaryTo: 6580000,
                city: 'Vienna'
            }, {
                id: 4,
                slug: 'ui-developer',
                title: 'UI Developer',
                createdAt: 'Sat Feb 17 2018 14:07:15 GMT+0100 (CET)',
                salaryFrom: 4060000,
                salaryTo: 6720000,
                city: 'Vienna'
            }, {
                id: 5,
                slug: 'principal-javascript-manager',
                title: 'Principal JavaScript Manager',
                createdAt: 'Sat Feb 17 2018 14:02:13 GMT+0100 (CET)',
                salaryFrom: 3640000,
                salaryTo: 6160000,
                city: 'Vienna'
            }, {
                id: 6,
                slug: 'regular-javascript-engineer',
                title: 'Regular JavaScript Engineer',
                createdAt: 'Sat Feb 17 2018 13:53:12 GMT+0100 (CET)',
                salaryFrom: 4060000,
                salaryTo: 5600000,
                city: 'Vienna'
            }
        ];

        beforeAll(() => provider.addInteraction({
            state: 'has some job offers',
            uponReceiving: 'a request for the job offers',
            withRequest: {
                method: 'GET',
                // endpoint on the back-end for web-ui side
                path: '/v1/jobs',
                headers: {
                    'Accept': Matchers.somethingLike('application/json')
                }
            },
            willRespondWith: {
                status: 200,
                headers: {
                    'Content-Type': Matchers.somethingLike('application/json')
                },
                body: LIST_BODY
            }
        }));
    
        it('returns a job list', async () => {
            const response = await fetchJobList();
            expect(response).toEqual(LIST_BODY);
        });
    })

    it('successfully verifies', () => provider.verify())
})



