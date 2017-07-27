import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import moment from "moment";

import * as paths from "../../constants/routePaths";

function DashboardCard({ schedule }) {
    const date = moment(schedule.date);
    return (
        <Link to={`${paths.ScheduleCancel}/${schedule.id}/${date.format("D-M-Y")}`} className="list-group-item list-group-item-action d-flex flex-column align-items-start flex-nowrap">
            <div className="d-flex flex-row flex-nowrap">
                <p className="lead mb-1">{date.format("dd, D-M-Y")}</p>
                <p className="align-self-center ml-2 mb-0">{schedule.location}</p>
            </div>
            <div className="d-flex flex-row">
                <div>
                    <div><strong>{moment(schedule.start, "HH:mm:ss").format("HH:mm")}</strong></div>
                    <div><strong>{moment(schedule.end, "HH:mm:ss").format("HH:mm")}</strong></div>
                </div>
                <div>
                    <p className="ml-3 mb-0 align-self-center">{schedule.course}</p>
                    <p className="ml-3 mb-0 align-self-center">Trainer: <strong>{schedule.trainer}</strong></p>
                </div>
            </div>
        </Link>
    );
}

DashboardCard.propTypes = {
    schedule: PropTypes.object.isRequired
};

export default DashboardCard;