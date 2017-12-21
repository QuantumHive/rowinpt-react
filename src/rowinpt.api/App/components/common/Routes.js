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
import Agenda from '../../containers/Agenda';
import Schedule from '../../containers/Schedule';
import ModList from '../users/ModList';
import ChangePassword from "../../containers/ChangePassword";
import MailList from "../../containers/MailList";

function Routes(props) {
    return (
        <Switch>
            {
                props.role === "User" || props.role === "Mod"
                ? <Route exact path={paths.Agenda} component={Dashboard} />
                : props.role === "Admin"
                ? <Route exact path={paths.Users} component={Users} />
                : false
            }

            {
                props.role === "Mod" || props.role === "Admin"
                ? <Route exact path={paths.Work} component={Agenda} />
                : false
            }

            <Route exact path={paths.ModList} component={ModList} />

            <Route exact path={paths.NewUser} component={NewUser} />
            <Route exact path={paths.EditUser} component={EditUser} />

            <Route path={paths.Schedule} component={Schedule} />

            {
                props.role === "User"
                ? <Route exact path={paths.Profile} component={Profile} />
                : false
            }
            
            <Route exact path={paths.Settings} component={Settings} />
            <Route exact path="/settings/password/change" component={ChangePassword} />
            <Route exact path="/settings/absentlist" component={MailList} />
        </Switch>);
}

Routes.propTypes = {
    role: PropTypes.string.isRequired
};

export default Routes;