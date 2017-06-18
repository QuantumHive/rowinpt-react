import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as paths from '../../constants/routePaths';

function CourseTypeCard({courseType, step}) {
    return (
        <div className="card">
            <div className="card-block text-center">
                <h3 className="card-title">{courseType}</h3>
                <div className="text-right mt-5">
                    <Link to={paths.ScheduleDate} className="btn btn-outline-primary" onClick={step}>Kies</Link>
                </div>
            </div>
        </div>
    );
}

CourseTypeCard.propTypes = {
    courseType: PropTypes.string.isRequired,
    step: PropTypes.func.isRequired
};

export default CourseTypeCard;