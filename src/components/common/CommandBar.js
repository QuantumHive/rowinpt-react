import React from 'react';
import { Link } from 'react-router';

function renderSecondary(command, leftRight) {
    const secondaryEnabled = command.secondary !== null && command.secondary[leftRight] !== null;
    return secondaryEnabled
        ? (
            <div className="col text-center py-1">
                <button type="button" className="btn btn-outline-secondary btn-lg">{command.secondary[leftRight]['icon']}</button>
            </div>)
        : <div className="col" />;
}

function CommandBar({ command }) {
    if (command === null) return false;

    const primary = command.primary === null
        ? <div className="col-6 text-center py-1" />
        : (
            <div className="col-8 text-center py-1">
                <Link to={command.primary.url} role="button" className="btn btn-outline-success btn-lg btn-block">{command.primary.name}</Link>
            </div>);

    const secondaryLeft = renderSecondary(command, 'left');
    const secondaryRight = renderSecondary(command, 'right');

    const commandBar = (
        <div className="fixed-bottom row bg-faded">
            {secondaryLeft}
            {primary}
            {secondaryRight}
        </div>);

    return commandBar;
}

export default CommandBar;