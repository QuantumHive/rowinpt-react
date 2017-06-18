import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as paths from '../../constants/routePaths';

function CourseDateCard({date}) {
    return (
        <div className="card col p-0 d-flex flex-column">
            <h5 className="pt-2 pl-3 col">{date}</h5>
            <div className="text-right m-3">
                <Link to={paths.ScheduleCourse} role="button" className="btn btn-outline-primary" >Kies</Link>
            </div>
        </div>
    );
}

CourseDateCard.propTypes = {
    date: PropTypes.string.isRequired
};

export default CourseDateCard;