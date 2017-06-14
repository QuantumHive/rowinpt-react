import React from 'react';

function Location() {
    return (
        <div>
            <div className="row">
                <div className="col"></div>
                <div className="col-10">
                    <div className="card mt-3">
                        <div className="card-block">
                            <h4 className="card-title">Arnhem Noord</h4>
                            <address className="card-text">
                                Mercatorweg 65
                                <br />
                                6827DB Arnhem
                                </address>
                            <a href="#" className="btn btn-outline-primary">Kies</a>
                        </div>
                    </div>
                </div>
                <div className="col"></div>
            </div>
            <div className="row">
                <div className="col"></div>
                <div className="col-10">
                    <div className="card mt-3">
                        <div className="card-block">
                            <h4 className="card-title">Elderveld</h4>
                            <address className="card-text">
                                Kromwijkplaats 4
                                <br />
                                6843GR Arnhem
                            </address>
                            <a href="#" className="btn btn-outline-primary">Kies</a>
                        </div>
                    </div>
                </div>
                <div className="col"></div>
            </div>
            <div className="row">
                <div className="col"></div>
                <div className="col-10">
                    <div className="card mt-3">
                        <div className="card-block">
                            <h4 className="card-title">Malburgen</h4>
                            <address className="card-text">
                                Lipinestraat 12
                                <br />
                                6841GD Arnhem
                                </address>
                            <a href="#" className="btn btn-outline-primary">Kies</a>
                        </div>
                    </div>
                </div>
                <div className="col"></div>
            </div>
        </div>
    );
}

export default Location;