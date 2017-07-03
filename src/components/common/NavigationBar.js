import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import * as paths from '../../constants/routePaths';

function NavigationBar(props) {
    const home = props.role === "User" ? (<li className="nav-item">
        <NavLink exact to={paths.default} className="nav-link" activeClassName="active"><i className="fa fa-home fa-2x" /></NavLink >
    </li>) : false;
    // const profile = props.role === "User" ? (<li className="nav-item">
    //     <NavLink to={paths.Profile} className="nav-link" activeClassName="active"><i className="fa fa-user fa-2x" /></NavLink >
    // </li>) : false;
    return (
        <nav className="navbar navbar-light bg-faded">
            <ul className="navbar-nav bg-faded nav-justified flex-row">
                {home}
                {/*{profile}*/}
                {props.role === "Admin" ?
                    <li className="nav-item">
                        <NavLink to={paths.UserSettings} className="nav-link" activeClassName="active"><i className="fa fa-cog fa-2x" /></NavLink >
                    </li> : false}
            </ul>
        </nav>
    );
}

NavigationBar.propTypes = {
    role: PropTypes.string.isRequired
};

export default NavigationBar;