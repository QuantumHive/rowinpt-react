import React from 'react';
import { Link } from 'react-router';

function CourseDate() {
    return (
        <div className="col p-0 d-flex flex-column align-items-stretch">
            <div className="col p-0 d-flex align-items-stretch">
                <div className="col p-0 d-flex align-items-stretch">
                    <div className="card col p-0 d-flex flex-column">
                        <h5 className="pt-2 pl-3 col">MA 19-6-2017</h5>
                        <div className="text-right m-3">
                            <Link to="#" role="button" className="btn btn-outline-primary" >Kies</Link>
                        </div>
                    </div>
                </div>
                <div className="col p-0 d-flex align-items-stretch">
                    <div className="card col p-0 d-flex flex-column">
                        <h5 className="pt-2 pl-3 col">DI 20-6-2017</h5>
                        <div className="text-right m-3">
                            <Link to="#" role="button" className="btn btn-outline-primary" >Kies</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col p-0 d-flex align-items-stretch">
                <div className="col p-0 d-flex align-items-stretch">
                    <div className="card col p-0 d-flex flex-column">
                        <h5 className="pt-2 pl-3 col">WO 21-6-2017</h5>
                        <div className="text-right m-3">
                            <Link to="#" role="button" className="btn btn-outline-primary" >Kies</Link>
                        </div>
                    </div>
                </div>
                <div className="col p-0 d-flex align-items-stretch">
                    <div className="card col p-0 d-flex flex-column">
                        <h5 className="pt-2 pl-3 col">DO 22-6-2017</h5>
                        <div className="text-right m-3">
                            <Link to="#" role="button" className="btn btn-outline-primary" >Kies</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col p-0 d-flex align-items-stretch">
                <div className="col p-0 d-flex align-items-stretch">
                    <div className="card col p-0 d-flex flex-column">
                        <h5 className="pt-2 pl-3 col">VR 23-6-2017</h5>
                        <div className="text-right m-3">
                            <Link to="#" role="button" className="btn btn-outline-primary" >Kies</Link>
                        </div>
                    </div>
                </div>
                <div className="col p-0 d-flex align-items-stretch">
                    <div className="card col p-0 d-flex flex-column">
                        <h5 className="pt-2 pl-3 col">ZA 24-6-2017</h5>
                        <div className="text-right m-3">
                            <Link to="#" role="button" className="btn btn-outline-primary" >Kies</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col p-0 d-flex align-items-stretch">
                <div className="col p-0 d-flex align-items-stretch">
                    <div className="card col p-0 d-flex flex-column">
                        <h5 className="pt-2 pl-3 col">ZO 25-6-2017</h5>
                        <div className="text-right m-3">
                            <Link to="#" role="button" className="btn btn-outline-primary" >Kies</Link>
                        </div>
                    </div>
                </div>
                <div className="col p-0 d-flex align-items-stretch" />
            </div>
        </div>
    );
}

export default CourseDate;