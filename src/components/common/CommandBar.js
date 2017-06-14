import React from 'react';
import {Link} from 'react-router';

function CommandBar({command}) {
    const commandBar = command != null ? (
        <div className="fixed-bottom row bg-faded">
            <div className="col-2"></div>
            <div className="col-8 text-center py-1">
                <Link to={command.url} role="button" className="btn btn-outline-success btn-lg btn-block">{command.name}</Link>
            </div>
            <div className="col-2"></div>
    </div>) : false;

    return commandBar;
}

export default CommandBar;