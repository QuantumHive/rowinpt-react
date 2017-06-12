import React from 'react';
import PropTypes from 'prop-types';
import DashboardCard from './DashboardCard';

function DashboardList({ agenda }) {
    return (
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