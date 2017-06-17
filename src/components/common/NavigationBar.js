import React from 'react';
import { IndexLink, Link } from 'react-router';

function NavigationBar() {
    return (
        <nav className="navbar navbar-light bg-faded">
            <ul className="navbar-nav bg-faded nav-justified flex-row">
                <li className="nav-item">
                    <IndexLink to="/" className="nav-link" activeClassName="active"><i className="fa fa-home fa-2x" /></IndexLink>
                </li>
                <li className="nav-item">
                    <Link to="/profile" className="nav-link" activeClassName="active"><i className="fa fa-user fa-2x" /></Link>
                </li>
                <li className="nav-item">
                    <Link to="/settings/users" className="nav-link" activeClassName="active"><i className="fa fa-cog fa-2x" /></Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavigationBar;