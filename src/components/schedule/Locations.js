import React from 'react';
import LocationCard from './LocationCard';

function Locations() {
    const locations = [
        {
            location:"Arnhem Noord",
            address:"Mercatorweg 65",
            postalcode:"6827DB",
            city:"Arnhem",
        },
        {
            location:"Elderveld",
            address:"Kromwijkplaats 4",
            postalcode:"6843GR",
            city:"Arnhem",
        },
        {
            location:"Malburgen",
            address:"Lipinestraat 12",
            postalcode:"6841GD",
            city:"Arnhem",
        }
    ];

    return (
        <div>
            {locations.map((location, index) => {
                return (
            <div key={index} className="row no-gutters">
                <div className="col" />
                <div className="col-10 pt-3">
                    <LocationCard {...location} />
                </div>
                <div className="col"/>
            </div>);
            })}
        </div>
    );
}

export default Locations;