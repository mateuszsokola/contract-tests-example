import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Link, Route } from 'react-router-dom';

import NotFound from "./components/NotFound";
import JobListPage from "./pages/JobListPage";
import JobPage from "./pages/JobPage";

// Load styles
require('./style.scss');

render(
    <HashRouter>
        <div>
            <nav className="pt-navbar pt-dark">
                <div className="pt-navbar-group pt-align-left">
                    <div className="pt-navbar-heading">
                        <Link to="/">JobList</Link>
                    </div>
                </div>
            </nav>
            <Route exact={true} path="/" component={JobListPage} />
            <Route path="/position/:id-:slug" component={JobPage} />
        </div>
    </HashRouter>,
    document.getElementById('web-ui')
);