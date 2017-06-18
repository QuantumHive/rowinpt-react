import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as paths from '../../constants/routePaths';
import _ from 'lodash';

function Confirm({schedule, cache}){
    const location = _.find(cache.locations, {id: schedule.location});
    const courseType = _.find(cache.coursetypes, {id: schedule.courseType});
    return (
        <div className="col text-center pt-3">
            <h2>Samenvatting</h2>
            <table className="table">
                <tbody>
                    <tr><td>{location.location}</td></tr>
                    <tr><td>{courseType.name}</td></tr>
                    <tr><td>{schedule.date.format("dddd, D MMMM Y")}</td></tr>
                    <tr><td>{schedule.course}</td></tr>
                </tbody>
            </table>

            <Link to={paths.default} role="button" className="btn btn-outline-success btn-lg btn-block">Aanmelden</Link>
        </div>
    );
}

Confirm.propTypes = {
    schedule: PropTypes.object.isRequired,
    cache: PropTypes.object.isRequired
};

export default Confirm;