import React from 'react';
import PropTypes from 'prop-types';
import LocationCard from './LocationCard';

function Locations({nextStep, locations}) {
    return (
        <div className="col p-0">
            <div className="list-group">
            {locations.map(location => {
                return (
                    <LocationCard key={location.id} location={location} step={() => nextStep(location.id)} />);
            })}
            </div>
        </div>
    );
}

Locations.propTypes = {
    nextStep: PropTypes.func.isRequired,
    locations: PropTypes.array.isRequired
};

export default Locations;