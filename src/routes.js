import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import * as paths from './constants/routePaths';

import Dashboard from './containers/Dashboard';
import Profile from './containers/Profile';
import Users from './containers/Users';
import NewUser from './containers/NewUser';
import EditUser from './containers/EditUser';

import Schedule from './containers/Schedule';

function Routes(props) {
    return (
        <Switch>
            <Route exact path={paths.default} component={props.role === "Admin" ? Users : Dashboard} />
            <Route exact path={paths.Profile} component={Profile} />
            <Route exact path={paths.UserSettings} component={Users} />
            <Route exact path={paths.NewUser} component={NewUser} />
            <Route exact path={paths.EditUser} component={EditUser} />
            <Route path={paths.Schedule} component={Schedule} />
        </Switch>);
}

Routes.propTypes = {
    role: PropTypes.string.isRequired
};

export default Routes;