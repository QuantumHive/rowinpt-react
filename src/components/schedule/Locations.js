import React from 'react';
import PropTypes from 'prop-types';
import LocationCard from './LocationCard';

function Locations({nextStep, locations}) {
    return (
        <div className="col p-0">
            {locations.map(location => {
                return (
                    <div key={location.id} className="row no-gutters">
                        <div className="col" />
                        <div className="col-10 pt-3">
                            <LocationCard location={location} step={() => nextStep(location.id)} />
                        </div>
                        <div className="col" />
                    </div>);
            })}
        </div>
    );
}

Locations.propTypes = {
    nextStep: PropTypes.func.isRequired,
    locations: PropTypes.array.isRequired
};

export default Locations;