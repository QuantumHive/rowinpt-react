import React from 'react';
import { Link } from 'react-router';

function Course(){
    return (
        <div className="col p-0">
            <div className="list-group">
                <Link to="#" className="list-group-item list-group-item-action d-flex flex-row flex-nowrap pl-0">
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

export default Course;