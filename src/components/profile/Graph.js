import React from 'react';
import { Line } from 'react-chartjs-2';

function Graph({data, options, title, subtitle, badge}) {
    return (
        <div className="">
            <hr />
            <h5 className="">
                <small className="text-muted">{title}</small>
            </h5>
            <h3 className="mb-3">
                {subtitle} <span className="badge badge-success px-3" style={{ fontWeight: "normal" }}>{badge}</span>
            </h3>
            <Line data={data} options={options} />
        </div>
    );
}

export default Graph;