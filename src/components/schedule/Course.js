import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as paths from '../../constants/routePaths';

import _ from 'lodash';

function getCourses(cache, day, locationId, courseTypeId) {
    const timetable = _.filter(cache.timetable, function (t) {
        return t.locationId === locationId && t.day === day;
    });

    return _.filter(timetable.map(t => {
        const course = _.find(cache.courses, {id: t.courseId});
        return {
            id: t.id,
            name: course.name,
            start: t.start,
            end: t.end,
            courseTypeId: course.courseTypeId
        };
    }), function(t) {
        return t.courseTypeId === courseTypeId;
    });
}

function Course({ nextStep, cache, schedule }) {
    const day = schedule.date.day();
    const courseTypeId = schedule.courseType;
    const locationId = schedule.location;
    const courses = getCourses(cache, day, locationId, courseTypeId);

    return (
        <div className="col p-0">
            <div className="list-group">
                {courses.map(course => {
                    return (
                        <Link key={course.id}
                            to={paths.ScheduleConfirm}
                            className="list-group-item list-group-item-action d-flex flex-row flex-nowrap pl-0"
                            onClick={() => nextStep(course.id)}>
                            <div className="col-2">
                                <div>{course.start}</div>
                                <div>{course.end}</div>
                            </div>
                            <div className="align-self-center col-10">
                                <p className="mb-0">{course.name}</p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

Course.propTypes = {
    nextStep: PropTypes.func.isRequired,
    schedule: PropTypes.object.isRequired,
    cache: PropTypes.object.isRequired
};

export default Course;