import React from 'react';
import PropTypes from 'prop-types';
import DashboardCard from './DashboardCard';
import { Link } from 'react-router-dom';
import * as paths from '../../constants/routePaths';

function DashboardList({ agenda }) {
    return (
        agenda.length === 0
            ?
            <div className="col d-flex flex-column justify-content-center align-items-center">
                <p className="text-warning lead">Je hebt nog niets ingepland, druk op inplannen om een schema in te plannen uit het lesrooster</p>
                <Link to={paths.ScheduleLocation}>
                    <i className="text-warning fa fa-angle-double-down fa-5x" />
                </Link>
            </div>
            :
            <div className="col p-0">
                <div className="list-group">
                    {
                        agenda.map(schedule => {
                            return <DashboardCard key={schedule.id} schedule={schedule} />;
                        })
                    }
                </div>
            </div>
    );
}

DashboardList.propTypes = {
    agenda: PropTypes.array.isRequired
};

export default DashboardList;