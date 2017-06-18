import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as paths from '../../constants/routePaths';

function Course({nextStep}){
    return (
        <div className="col p-0">
            <div className="list-group">
                <Link to={paths.ScheduleConfirm} className="list-group-item list-group-item-action d-flex flex-row flex-nowrap pl-0" onClick={() => nextStep("Bootcamp")}>
                    <div className="col-2">
                        <div>18:00</div>
                        <div>19:00</div>
                    </div>
                    <div className="align-self-center col-10">
                        <p className="mb-0">Bootcamp</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}

Course.propTypes = {
    nextStep: PropTypes.func.isRequired
};

export default Course;