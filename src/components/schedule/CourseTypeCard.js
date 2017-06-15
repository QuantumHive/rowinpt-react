import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import * as paths from '../../constants/routePaths';

function CourseTypeCard({courseType}) {
    return (
        <div className="card">
            <div className="card-block text-center">
                <h3 className="card-title">{courseType}</h3>
                <div className="text-right mt-5">
                    <Link to={paths.ScheduleDate} className="btn btn-outline-primary">Kies</Link>
                </div>
            </div>
        </div>
    );
}

CourseTypeCard.propTypes = {
    courseType: PropTypes.string.isRequired
};

export default CourseTypeCard;