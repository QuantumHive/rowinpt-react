import React from 'react';
import PropTypes from 'prop-types';
import DashboardCardItem from './DashboardCardItem';

function DashboardCard({ sportDay }) {
    return (
        <li className="list-group-item list-group-item-action card p-0 border-left-0 border-right-0 rounded-0">
            <div className="card-block p-0">
                <div className="row no-gutters">
                    <div className="col-12">
                        <h5 className="m-2">{sportDay.date}</h5>
                    </div>
                </div>
                {
                    sportDay.courses.map(course => {
                        return (<DashboardCardItem key={course.id} course={course} />);
                    })
                }
            </div>
        </li>
    );
}

DashboardCard.propTypes = {
    sportDay: PropTypes.object.isRequired
};

export default DashboardCard;