import React from 'react';
import PropTypes from 'prop-types';
import StretchGridColumn from './StretchGridColumn';

function StretchGridRow({columns}){
    return(
        <div className="col p-0 d-flex align-items-stretch">
            {
                columns.map((column, index) =>
                    <StretchGridColumn key={index} column={column} />)
            }
        </div>
    );
}

StretchGridRow.propTypes = {
    columns: PropTypes.array.isRequired
};

export default StretchGridRow;