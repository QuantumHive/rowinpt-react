import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as paths from '../../constants/routePaths';

function LocationCard({ location, step }) {
    return (
        <Link to={paths.ScheduleCourseType} className="list-group-item list-group-item-action d-flex flex-column align-items-start flex-nowrap p-4" onClick={step}>
                <h4>{location.location}</h4>
                <address>
                    {location.address}
                    <br />
                    {location.postalcode} {location.city}
                </address>
        </Link>
    );
}

LocationCard.propTypes = {
    location: PropTypes.object.isRequired,
    step: PropTypes.func.isRequired
};

export default LocationCard;