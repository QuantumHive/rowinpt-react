import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as paths from '../../constants/routePaths';

import moment from 'moment';

function CourseDateCard({ date, step, enabled }) {
    const today = moment();
    const max = today.clone().add(5, 'w');

    const content = (
        <span>
            <p className="mt-2 ml-3 lead align-self-start">{date.format("dddd")}</p>
            <p className="ml-3 align-self-start">{date.format("D-M-Y")}</p>
        </span>);

    return today.isSameOrBefore(date, 'd') && date.isSameOrBefore(max, 'd') && enabled ? (
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
    enabled: PropTypes.bool.isRequired
};

export default CourseDateCard;