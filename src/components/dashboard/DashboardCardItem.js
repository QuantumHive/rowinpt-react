import React from 'react';
import PropTypes from 'prop-types';

const leftBorder = {
    borderLeftWidth: "10px",
    borderLeftColor: "black",
    borderLeftStyle: "solid"
};

function DashboardCardItem({ course }) {
    return (
        <div className="row no-gutters">
            <div className="col-2 px-2 py-1 mb-1" style={leftBorder}>
                <div>{course.start}</div>
                <div>{course.end}</div>
            </div>
            <div className="col-10 align-self-center pl-3">
                <h4>{course.type}</h4>
            </div>
        </div>
    );
}

DashboardCardItem.propTypes = {
    course: PropTypes.object.isRequired
};

export default DashboardCardItem;