import React from 'react';

function CommandBar({command}) {
    const commandBar = command != null ? (
        <div className="fixed-bottom row bg-faded">
            <div className="col-2"></div>
            <div className="col-8 text-center py-1">
                <button href={command.url} type="button" className="btn btn-outline-success btn-lg btn-block">{command.name}</button>
            </div>
            <div className="col-2"></div>
    </div>) : false;

    return commandBar;
}

export default CommandBar;