import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as paths from '../../constants/routePaths';

import _ from 'lodash';
import moment from 'moment';

function CourseDateCard({ date, step, enabled, cache, schedule }) {
    const today = moment();
    const max = today.clone().add(5, 'w');

    let coursesLeft = true;
    if(today.isSame(date, 'd')){
        const courses = _.filter(cache.courses, c => c.courseTypeId == schedule.courseType).map(c => c.id);
        const startTimes = _.orderBy(_.filter(cache.timetable, t => {
            return t.locationId === schedule.location && t.day == today.day() && _.includes(courses, t.courseId);
        }).map(t => t.start));

        const lastTime = _.last(startTimes);
        if(lastTime !== undefined && today.isAfter(moment(lastTime, 'hh:mm'))){
            coursesLeft = false;
        }
    }

    const content = (
        <span>
            <p className="mt-2 ml-3 lead align-self-start">{date.format("dddd")}</p>
            <p className="ml-3 align-self-start">{date.format("D-M-Y")}</p>
        </span>);

    return today.isSameOrBefore(date, 'd') && date.isSameOrBefore(max, 'd') && enabled && coursesLeft? (
        <Link to={paths.ScheduleCourse} className="col p-0 d-flex flex-column list-group-item list-group-item-action list-group-item-success" onClick={() => step(date)}>
            {content}
        </Link>)
        :
        <div className="col p-0 d-flex flex-column list-group-item ">
            {content}
        </div>;
}

CourseDateCard.propTypes = {
    date: PropTypes.object.isRequired,
    step: PropTypes.func.isRequired,
    enabled: PropTypes.bool.isRequired,
    cache: PropTypes.object.isRequired,
    schedule: PropTypes.object.isRequired
};

export default CourseDateCard;