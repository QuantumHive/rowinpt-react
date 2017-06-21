import React from 'react';
import PropTypes from 'prop-types';
import Summary from './Summary';
import _ from 'lodash';
import moment from 'moment';

function Cancel({agenda, cache, cancel, match }) {
    const daySchedule = _.find(agenda, {id: Number(match.params.id)});
    const timetable = _.find(cache.timetable, {id: daySchedule.timetableId});
    const course = _.find(cache.courses, {id: timetable.courseId});
    
    const schedule = {
        location: timetable.locationId,
        courseType: course.courseTypeId,
        course: course.id,
        date: moment(match.params.date, "D-M-Y")
    };

    const courseDate = moment(match.params.date + " " + timetable.start, "D-M-Y hh:mm");
    const disable = moment().add(24, 'h').isAfter(courseDate);

    return (
        <div className="col text-center pt-3">
            <Summary schedule={schedule} cache={cache} />
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