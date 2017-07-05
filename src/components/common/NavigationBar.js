import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import * as paths from '../../constants/routePaths';

function NavigationBar(props) {
    const work = props.role === "Admin" || props.role === "Mod" ? (
        <li className="nav-item">
            <NavLink to={paths.Work} className="nav-link" activeClassName="active"><i className="fa fa-calendar fa-2x" /></NavLink >
        </li>
    ) : false;

    const dashboard = props.role === "User" || props.role === "Mod" ? (
        <li className="nav-item">
            <NavLink to={paths.Agenda} className="nav-link" activeClassName="active"><i className="fa fa-calendar-o fa-2x" /></NavLink >
        </li>) : props.role === "Admin" ? (
            <li className="nav-item">
                <NavLink to={paths.Users} className="nav-link" activeClassName="active"><i className="fa fa-users fa-2x" /></NavLink>
            </li>
        ) : false;
    // const profile = props.role === "User" ? (<li className="nav-item">
    //     <NavLink to={paths.Profile} className="nav-link" activeClassName="active"><i className="fa fa-user fa-2x" /></NavLink >
    // </li>) : false;
    const settings = (
        <li className="nav-item">
            <NavLink to={paths.Settings} className="nav-link" activeClassName="active"><i className="fa fa-cog fa-2x" /></NavLink >
        </li>
    );
    return (
        <nav className="navbar navbar-light bg-faded">
            <ul className="navbar-nav bg-faded nav-justified flex-row">
                {work}
                {dashboard}
                {/*{profile}*/}
                {settings}
            </ul>
        </nav>
    );
}

NavigationBar.propTypes = {
    role: PropTypes.string.isRequired
};

export default NavigationBar;