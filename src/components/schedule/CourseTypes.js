import React from 'react';
import PropTypes from 'prop-types';
import CourseTypeCard from './CourseTypeCard';
import _ from 'lodash';

function mapCourseTypes(cache, location){
    const courseIds = _.filter(cache.timetable, function(t){
        return t.locationId === location;
    }).map(item => item.courseId);

    const courseTypeIds = _.filter(cache.courses, function(c){
        return _.includes(_.uniq(courseIds), c.id);
    }).map(item => item.courseTypeId);

    return _.filter(cache.coursetypes, function(c){
        return _.includes(_.uniq(courseTypeIds), c.id);
    });
}

function CourseTypes({nextStep, cache, location}) {
    const courseTypes = mapCourseTypes(cache, location);
    return (
        <div className="col p-0">
            {courseTypes.map((courseType, index) => {
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
    cache: PropTypes.object.isRequired,
    location: PropTypes.number.isRequired
};

export default CourseTypes;