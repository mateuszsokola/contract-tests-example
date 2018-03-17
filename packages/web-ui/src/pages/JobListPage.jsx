import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

import fetchJobList from '../services/fetchJobList.js';
import Loading from '../components/Loading';
import Salary from '../components/Salary';

class JobListPage extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      error: null,
      items: []
    }
  }

  componentWillMount() {
    this.setState({ loading: true, error: null });
    
    fetchJobList()
      .then(items => {
        this.setState({ loading: false, error: null, items });
      })
      .catch(error => {
        this.setState({ loading: false, error: error.message });
      })
  }

  render() {
    const { loading, error, items } = this.state;

    if (loading) {
      return <Loading />;
    }

    return (
      <ul className='pt-job-list'>
        {items.map((item, i) => {
          const dateToFormat = (new Date(item.createdAt));
          return (<li key={i}>
            <Link to={`/position/${item.id}-${item.slug}`}>
              <span>
                <span className='title'>{item.title}</span>
                <span className='location'>{item.city}</span>
              </span>
              <Salary from={item.salaryFrom} to={item.salaryTo} />
              <Moment fromNow={true} date={dateToFormat.toUTCString()}/>
            </Link>
          </li>)
        })}
      </ul>
    )
  }
}

export default JobListPage;