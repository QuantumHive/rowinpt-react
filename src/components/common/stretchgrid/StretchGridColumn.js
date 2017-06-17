import React from 'react';
import PropTypes from 'prop-types';

function StretchGridColumn({column}){
    return(
        <div className="col p-0 d-flex align-items-stretch">
            {column}
        </div>
    );
}

StretchGridColumn.propTypes = {
    column: PropTypes.object.isRequired
};

export default StretchGridColumn;