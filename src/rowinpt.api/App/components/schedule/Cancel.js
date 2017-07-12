import React from 'react';
import PropTypes from 'prop-types';
import Summary from './Summary';
import _ from 'lodash';
import moment from 'moment';

function Cancel({agenda, cache, cancel, match }) {
    const schedule = _.find(agenda, {id: Number(match.params.id)});
    const timetable = _.find(cache.timetable, {id: schedule.timetableId});
    const location = _.find(cache.locations, {id: timetable.locationId});
    const course = _.find(cache.courses, {id: timetable.courseId});
    const courseType = _.find(cache.coursetypes, {id: course.courseTypeId});
    
    const scheduleView = {
        location: location.location,
        courseType: courseType.name,
        date: moment(match.params.date, "D-M-Y"),
        start: timetable.start,
        end: timetable.end,
        course: course.name,
    };

    const courseDate = moment(match.params.date + " " + timetable.start, "D-M-Y hh:mm");
    const disable = moment().add(24, 'h').isAfter(courseDate);

    return (
        <div className="col text-center pt-3">
            <Summary schedule={scheduleView} />
            {
                disable
                ? <button disabled="disabled" role="button" className="btn btn-danger btn-lg btn-block">Afmelden</button>
                : <button role="button" className="btn btn-outline-danger btn-lg btn-block" onClick={() => cancel(match.params.id)}>Afmelden</button>
            }
            
        </div>
    );
}

Cancel.propTypes = {
    agenda: PropTypes.array.isRequired,
    cache: PropTypes.object.isRequired,
    cancel: PropTypes.func.isRequired,
    match: PropTypes.object
};

export default Cancel;