import React from 'react';
import { mount } from 'enzyme';

import JobListPage from '../JobListPage';

jest.mock('react-router-dom')

const EXPECTED_BODY = [
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

describe.skip('<JobListPage />', () => {
    it('displays a loading screen', () => {
        const wrapper = mount(<JobListPage />);

        expect(wrapper.html()).toMatchSnapshot();
    });

    it('displays a job listing', () => {
        const wrapper = mount(<JobListPage />);

        wrapper.setState({
            loading: false,
            error: null,
            items: EXPECTED_BODY
        })

        expect(wrapper.html()).toMatchSnapshot();
    });

})