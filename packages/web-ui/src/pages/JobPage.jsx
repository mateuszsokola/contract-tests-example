import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

import fetchJob from '../services/fetchJob.js';
import NotFound from '../components/NotFound';
import Loading from '../components/Loading';
import Salary from '../components/Salary';

class JobPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            error: null,
            item: null
        }
    }

    componentWillMount() {
        const { id, slug } = this.props.match.params;
        this.setState({ loading: true, error: null });

        fetchJob({ id, slug })
            .then(item => {
                this.setState({ loading: false, error: null, item });
            })
            .catch(error => {
                this.setState({ loading: false, error: error.message });
            })
    }

    render() {
        const { loading, error, item } = this.state;

        if (loading) {
            return <Loading />;
        }

        if (error) {
            return <NotFound />;
        }

        const dateToFormat = (new Date(item.createdAt));
        
        return (
            <div>
                <h1>{item.title}</h1>
                <span className='location'>{item.city}</span>
                <Salary from={item.salaryFrom} to={item.salaryTo} />
                <Moment fromNow={true} date={dateToFormat.toUTCString()}/>
            </div>
        )
    }
}

export default JobPage;