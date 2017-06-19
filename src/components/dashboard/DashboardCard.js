import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import * as paths from '../../constants/routePaths';

function DashboardCard({ schedule }) {
    return (
        <Link to={`${paths.ScheduleCancel}/${schedule.id}/${schedule.date.format("D-M-Y")}`} className="list-group-item list-group-item-action d-flex flex-column align-items-start flex-nowrap">
            <div className="d-flex flex-row flex-nowrap">
                <p className="lead mb-1">{schedule.date.format("dd, D-M-Y")}</p>
                <p className="align-self-center ml-2 mb-0">{schedule.location}</p>
            </div>
            <div className="d-flex flex-row">
                <div>
                    <div><strong>{schedule.start}</strong></div>
                    <div><strong>{schedule.end}</strong></div>
                </div>
                <p className="ml-3 mb-0 align-self-center">{schedule.type}</p>
            </div>
        </Link>
    );
}

DashboardCard.propTypes = {
    schedule: PropTypes.object.isRequired
};

export default DashboardCard;