import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import * as paths from '../../constants/routePaths';

import Dashboard from '../../containers/Dashboard';
import Profile from '../../containers/Profile';
import Users from '../../containers/Users';
import NewUser from '../../containers/NewUser';
import EditUser from '../../containers/EditUser';
import Settings from '../../containers/Settings';

import Schedule from '../../containers/Schedule';

function Routes(props) {
    return (
        <Switch>
            {
                props.role === "Users"
                ? <Route exact path={paths.Agenda} component={Dashboard} />
                : props.role === "Admin"
                ? <Route exact path={paths.Users} component={Users} />
                : false
            }

            <Route exact path={paths.NewUser} component={NewUser} />
            <Route exact path={paths.EditUser} component={EditUser} />

            <Route path={paths.Schedule} component={Schedule} />

            {
                props.role === "Users"
                ? <Route exact path={paths.Profile} component={Profile} />
                : false
            }
            
            <Route exact path={paths.Settings} component={Settings} />
        </Switch>);
}

Routes.propTypes = {
    role: PropTypes.string.isRequired
};

export default Routes;