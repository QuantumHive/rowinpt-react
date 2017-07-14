import React from "react";
import PropTypes from "prop-types";
import Summary from "./Summary";
import _ from "lodash";
import Moment from "moment";

function Confirm({ schedule, cache, submit }) {
    const location = _.find(cache.locations, {id: schedule.location});
    const courseType = _.find(cache.coursetypes, {id: schedule.courseType});
    const timetable = _.find(cache.timetable, {id: schedule.course});
    const course =  _.find(cache.courses, {id: timetable.courseId});
    const scheduleView = {
        location: location.location,
        courseType: courseType.name,
        start: timetable.start,
        date: Moment(schedule.date, "D-M-Y"),
        end: timetable.end,
        course: course.name,
        trainer: timetable.trainer
    };

    return (
        <div className="col text-center pt-3">
            <Summary schedule={scheduleView} />
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