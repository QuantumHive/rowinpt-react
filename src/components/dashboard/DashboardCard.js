import React from 'react';
import PropTypes from 'prop-types';
import DashboardCardItem from './DashboardCardItem';

function DashboardCard({ schedule }) {
    return (
        <li className="list-group-item list-group-item-action card p-0 border-left-0 border-right-0 rounded-0">
            <div className="card-block p-0">
                <div className="row no-gutters">
                    <div className="col-12">
                        <h5 className="m-2">{schedule.date.format("D-M-Y")}</h5>
                    </div>
                </div>
                <DashboardCardItem course={schedule} />
            </div>
        </li>
    );
}

DashboardCard.propTypes = {
    schedule: PropTypes.object.isRequired
};

export default DashboardCard;