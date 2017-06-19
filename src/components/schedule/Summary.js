import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

function Summary({ schedule, cache}) {
    const location = _.find(cache.locations, { id: schedule.location });
    const courseType = _.find(cache.coursetypes, { id: schedule.courseType });
    const timetable = _.find(cache.timetable, { id: schedule.course });
    const course = _.find(cache.courses, { id: timetable.courseId });
    return (
        <div className="col p-0">
            <h2>Samenvatting</h2>
            <table className="table">
                <tbody>
                    <tr><td>{location.location}</td></tr>
                    <tr><td>{courseType.name}</td></tr>
                    <tr><td>{schedule.date.format("dddd, D MMMM Y")}</td></tr>
                    <tr><td>{timetable.start} - {timetable.end}</td></tr>
                    <tr><td>{course.name}</td></tr>
                </tbody>
            </table>
        </div>
    );
}

Summary.propTypes = {
    schedule: PropTypes.object.isRequired,
    cache: PropTypes.object.isRequired,
};

export default Summary;