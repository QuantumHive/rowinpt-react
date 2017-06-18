import React from 'react';
import PropTypes from 'prop-types';
import DashboardCard from './DashboardCard';

function DashboardList({ agenda }) {
    return (
        agenda.length === 0
        ?
        <div className="col d-flex flex-column justify-content-center align-items-center">
            <p className="text-warning lead">Je hebt nog niets ingepland, druk op inplannen om een schema in te plannen uit het lesrooster</p>
            <i className="text-warning fa fa-angle-double-down fa-5x" />
        </div>
        :
        <ul className="list-group">
            {
                agenda.map(sportDay => {
                    return (<DashboardCard key={sportDay.id} sportDay={sportDay} />);
                })
            }
        </ul>
    );
}

DashboardList.propTypes = {
    agenda: PropTypes.array.isRequired
};

export default DashboardList;