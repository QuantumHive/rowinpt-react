import React from 'react';
import { Route, Switch } from 'react-router-dom';

import * as paths from './constants/routePaths';

import Dashboard from './containers/Dashboard';
import Profile from './containers/Profile';
import Users from './containers/UserSettings';

import Schedule from './containers/Schedule';


export default (
    <Switch>
        <Route exact path={paths.default} component={Dashboard} />
        <Route path={paths.Profile} component={Profile} />
        <Route path={paths.Settings} component={Users} />
        <Route path={paths.Schedule} component={Schedule} />
    </Switch>
);