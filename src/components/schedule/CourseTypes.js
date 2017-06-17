import React from 'react';
import CourseTypeCard from './CourseTypeCard';

function CourseTypes() {
    const courseTypes = ["Personal Training", "Small Group", "Groepsles"];

    return (
        <div className="col p-0">
            {courseTypes.map((courseType, index) => {
                return (
                    <div key={index} className="row no-gutters">
                        <div className="col" />
                        <div className="col-10 pt-3">
                            <CourseTypeCard courseType={courseType} />
                        </div>
                        <div className="col" />
                    </div>
                );
            })}
        </div>
    );
}

export default CourseTypes;