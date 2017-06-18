import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as paths from '../../constants/routePaths';

function LocationCard({ location, address, postalcode, city, step }) {
    return (
        <div className="card">
            <div className="card-block">
                <h4 className="card-title">{location}</h4>
                <address className="card-text">
                    {address}
                    <br />
                    {postalcode} {city}
                </address>
                <div className="text-right">
                    <Link to={paths.ScheduleCourseType} role="button" className="btn btn-outline-primary" onClick={step} >Kies</Link>
                </div>
            </div>
        </div>
    );
}

LocationCard.propTypes = {
    location: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    postalcode: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    step: PropTypes.func.isRequired
};

export default LocationCard;