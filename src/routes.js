
import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './components/App';
import Dashboard from './containers/Dashboard';
import Profile from './containers/Profile';
import Users from './containers/Users';
import UserManagement from './containers/UserManagement';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Dashboard} />
        <Route path="/profile" component={Profile} />
        <Route path="/settings/users" component={Users} />
        <Route path="/user" component={UserManagement} />
        <Route path="/user/:id" component={UserManagement} />
    </Route>
);