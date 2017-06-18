import React from 'react';
import PropTypes from 'prop-types';
import LocationCard from './LocationCard';

const locations = [
    {
        location: "Arnhem Noord",
        address: "Mercatorweg 65",
        postalcode: "6827DB",
        city: "Arnhem",
    },
    {
        location: "Elderveld",
        address: "Kromwijkplaats 4",
        postalcode: "6843GR",
        city: "Arnhem",
    },
    {
        location: "Malburgen",
        address: "Lipinestraat 12",
        postalcode: "6841GD",
        city: "Arnhem",
    }
];

function Locations({nextStep}) {
    return (
        <div className="col p-0">
            {locations.map((location, index) => {
                return (
                    <div key={index} className="row no-gutters">
                        <div className="col" />
                        <div className="col-10 pt-3">
                            <LocationCard {...location} step={() => nextStep(location.location)} />
                        </div>
                        <div className="col" />
                    </div>);
            })}
        </div>
    );
}

Locations.propTypes = {
    nextStep: PropTypes.func.isRequired
};

export default Locations;