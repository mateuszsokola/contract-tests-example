import React from 'react';
import { mount } from 'enzyme';

import JobPage from '../JobPage';

jest.mock('react-router-dom')

const EXPECTED_BODY = {
    id: 1,
    slug: 'senior-front-end-developer',
    title: 'Senior Front End Developer',
    createdAt: 'Sat Feb 10 2018 18:12:40 GMT+0100 (CET)',
    salaryFrom: 4340000,
    salaryTo: 5880000,
    city: 'Vienna'
};

describe('<JobPage />', () => {
    it('displays a job posting', () => {
        const match = {
            params: {
                id: 1,
                slug: 'senior-front-end-developer'
            }
        };
        const wrapper = mount(<JobPage match={match}/>);

        wrapper.setState({
            loading: false,
            error: null,
            item: EXPECTED_BODY
        })

        expect(wrapper.html()).toMatchSnapshot();
    });

    it('displays a not found', () => {
        const match = {
            params: {
                id: 2,
                slug: 'non-existent-position'
            }
        };
        const wrapper = mount(<JobPage match={match}/>);

        wrapper.setState({
            loading: false,
            error: new Error('Not Found'),
            item: null
        })

        expect(wrapper.html()).toMatchSnapshot();
    });

    it('displays a loading info', () => {
        const match = {
            params: {
                id: 1,
                slug: 'senior-front-end-developer'
            }
        };
        const wrapper = mount(<JobPage match={match}/>);

        wrapper.setState({
            loading: true,
            error: null,
            item: null
        })

        expect(wrapper.html()).toMatchSnapshot();
    });
})