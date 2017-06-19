import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as paths from '../../constants/routePaths';

function CourseDateCard({date, step, enabled}) {
    return (
        <div className="card col p-0 d-flex flex-column">
            <h5 className="pt-2 pl-3 col">{date.format("dd D-M-Y")}</h5>
            { enabled ?
            <div className="text-right m-3">
                <Link to={paths.ScheduleCourse} role="button" className="btn btn-outline-primary" onClick={() => step(date)} >Kies</Link>
            </div> : false}
        </div>
    );
}

CourseDateCard.propTypes = {
    date: PropTypes.object.isRequired,
    step: PropTypes.func.isRequired,
    enabled: PropTypes.bool.isRequired
};

export default CourseDateCard;