import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

function Confirm({ schedule, cache, submit }) {
    const location = _.find(cache.locations, { id: schedule.location });
    const courseType = _.find(cache.coursetypes, { id: schedule.courseType });
    const timetable = _.find(cache.timetable, { id: schedule.course });
    const course = _.find(cache.courses, { id: timetable.courseId });
    return (
        <div className="col text-center pt-3">
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

            <button role="button" className="btn btn-outline-success btn-lg btn-block" onClick={submit}>Aanmelden</button>
        </div>
    );
}

Confirm.propTypes = {
    schedule: PropTypes.object.isRequired,
    cache: PropTypes.object.isRequired,
    submit: PropTypes.func.isRequired
};

export default Confirm;