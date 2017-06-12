import React from 'react';
import { IndexLink, Link } from 'react-router';

function Navigation() {
    return (
            <ul className="nav nav-justified">
                <li className="nav-item">
                    <IndexLink to="/" className="nav-link" activeClassName="active"><i className="fa fa-home fa-2x" /></IndexLink>
                </li>
                <li className="nav-item">
                    <Link to="/profile" className="nav-link" activeClassName="active"><i className="fa fa-user fa-2x" /></Link>
                </li>
                <li className="nav-item">
                    <Link to="/users" className="nav-link" activeClassName="active"><i className="fa fa-cog fa-2x" /></Link>
                </li>
            </ul>
    );
}

export default Navigation;