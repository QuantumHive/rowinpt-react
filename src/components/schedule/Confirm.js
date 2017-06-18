import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as paths from '../../constants/routePaths';

function Confirm({schedule}){
    return (
        <div className="col text-center pt-3">
            <h2>Samenvatting</h2>
            <table className="table">
                <tbody>
                    <tr><td>{schedule.location}</td></tr>
                    <tr><td>{schedule.courseType}</td></tr>
                    <tr><td>{schedule.date}</td></tr>
                    <tr><td>{schedule.course}</td></tr>
                </tbody>
            </table>

            <Link to={paths.default} role="button" className="btn btn-outline-success btn-lg btn-block">Aanmelden</Link>
        </div>
    );
}

Confirm.propTypes = {
    schedule: PropTypes.object.isRequired
};

export default Confirm;