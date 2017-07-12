import React from 'react';
import PropTypes from 'prop-types';
import StretchGridRow from './StretchGridRow';

function StretchGrid({rows}){
    return (
        <div className="col p-0 d-flex flex-column align-items-stretch">
            {
                rows.map((columns, index) =>
                    <StretchGridRow key={index} columns={columns} />)
            }
        </div>
    );
}

StretchGrid.propTypes = {
    rows: PropTypes.array.isRequired
};

export default StretchGrid;