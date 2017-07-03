import React from 'react';
import PropTypes from 'prop-types';

function Summary({schedule}) {
    return (
        <div className="col p-0">
            <h2>Samenvatting</h2>
            <table className="table">
                <tbody>
                    <tr><td>{schedule.location}</td></tr>
                    <tr><td>{schedule.courseType}</td></tr>
                    <tr><td>{schedule.date.format("dddd, D MMMM Y")}</td></tr>
                    <tr><td>{schedule.start} - {schedule.end}</td></tr>
                    <tr><td>{schedule.course}</td></tr>
                </tbody>
            </table>
        </div>
    );
}

Summary.propTypes = {
    schedule: PropTypes.object.isRequired,
};

export default Summary;