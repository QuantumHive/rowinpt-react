import React from 'react';
import { NavLink } from 'react-router-dom';

import * as paths from '../../constants/routePaths';

function NavigationBar() {
    return (
        <nav className="navbar navbar-light bg-faded">
            <ul className="navbar-nav bg-faded nav-justified flex-row">
                <li className="nav-item">
                    <NavLink exact to={paths.default} className="nav-link" activeClassName="active"><i className="fa fa-home fa-2x" /></NavLink >
                </li>
                <li className="nav-item">
                    <NavLink  to={paths.Profile} className="nav-link" activeClassName="active"><i className="fa fa-user fa-2x" /></NavLink >
                </li>
                <li className="nav-item">
                    <NavLink  to={paths.UserSettings} className="nav-link" activeClassName="active"><i className="fa fa-cog fa-2x" /></NavLink >
                </li>
            </ul>
        </nav>
    );
}

export default NavigationBar;