import React from 'react';
import PropTypes from 'prop-types';
import CourseTypeCard from './CourseTypeCard';

const courseTypes = ["Personal Training", "Small Group", "Groepsles"];

function CourseTypes({nextStep}) {
    return (
        <div className="col p-0">
            {courseTypes.map((courseType, index) => {
                return (
                    <div key={index} className="row no-gutters">
                        <div className="col" />
                        <div className="col-10 pt-3">
                            <CourseTypeCard courseType={courseType} step={() => nextStep(courseType)} />
                        </div>
                        <div className="col" />
                    </div>
                );
            })}
        </div>
    );
}

CourseTypes.propTypes = {
    nextStep: PropTypes.func.isRequired
};

export default CourseTypes;