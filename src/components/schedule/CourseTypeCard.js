import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as paths from '../../constants/routePaths';

function CourseTypeCard({courseType, step}) {
    return (
        <Link to={paths.ScheduleDate} className="list-group-item list-group-item-action d-flex flex-column align-items-start flex-nowrap p-4" onClick={step}>
                <h3 >{courseType.name}</h3>
        </Link>
    );
}

CourseTypeCard.propTypes = {
    courseType: PropTypes.object.isRequired,
    step: PropTypes.func.isRequired
};

export default CourseTypeCard;