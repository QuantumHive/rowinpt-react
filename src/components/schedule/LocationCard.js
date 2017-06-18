import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as paths from '../../constants/routePaths';

function LocationCard({ location, step }) {
    return (
        <div className="card">
            <div className="card-block">
                <h4 className="card-title">{location.location}</h4>
                <address className="card-text">
                    {location.address}
                    <br />
                    {location.postalcode} {location.city}
                </address>
                <div className="text-right">
                    <Link to={paths.ScheduleCourseType} role="button" className="btn btn-outline-primary" onClick={step} >Kies</Link>
                </div>
            </div>
        </div>
    );
}

LocationCard.propTypes = {
    location: PropTypes.object.isRequired,
    step: PropTypes.func.isRequired
};

export default LocationCard;