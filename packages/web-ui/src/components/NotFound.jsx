import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div>
            <h1>Not Found</h1>
            <span>Proceed to <Link to='/'>job listing</Link></span>
        </div>
    )
}

export default NotFound;