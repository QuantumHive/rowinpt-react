import React from 'react';
import PropTypes from 'prop-types';
import CourseTypeCard from './CourseTypeCard';

function CourseTypes({nextStep, coursetypes}) {
    return (
        <div className="col p-0">
            {coursetypes.map((courseType, index) => {
                return (
                    <div key={index} className="row no-gutters">
                        <div className="col" />
                        <div className="col-10 pt-3">
                            <CourseTypeCard courseType={courseType} step={() => nextStep(courseType.id)} />
                        </div>
                        <div className="col" />
                    </div>
                );
            })}
        </div>
    );
}

CourseTypes.propTypes = {
    nextStep: PropTypes.func.isRequired,
    coursetypes: PropTypes.array.isRequired
};

export default CourseTypes;