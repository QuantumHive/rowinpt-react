import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as paths from '../../constants/routePaths';

function Confirm({scheduleState}){
    return (
        <div className="col text-center pt-3">
            <h2>Samenvatting</h2>
            <table className="table">
                <tbody>
                    <tr><td>{scheduleState.location}</td></tr>
                    <tr><td>Groepsles</td></tr>
                    <tr><td>Maandag 27 juni 2017</td></tr>
                    <tr><td>Bootcamp</td></tr>
                </tbody>
            </table>

            <Link to={paths.default} role="button" className="btn btn-outline-success btn-lg btn-block">Aanmelden</Link>
        </div>
    );
}

Confirm.propTypes = {
    scheduleState: PropTypes.object
};

export default Confirm;