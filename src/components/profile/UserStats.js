import React from 'react';
import Graph from './Graph';
import moment from 'moment';

const datasetsTemplate = {
    backgroundColor: 'rgba(255, 99, 132, 0.3)',
    borderColor: 'rgb(255, 99, 132)',
    pointBackgroundColor: 'rgb(255, 99, 132)',
    borderWidth: 5,
    fill: true,
    pointStyle: 'circle',
    hitRadius: 20,
};

const options = {
    legend: {
        display: false,
    },
    animation: {
        duration: 500,
    },
    scales: {
        xAxes: [{
            gridLines: {
                display: false,
            },
            ticks: {
                autoSkipPadding: 20,
            }
        }],
        yAxes: [{
            gridLines: {
                drawBorder: false,
                drawTicks: true,
            },
            ticks: {
                maxTicksLimit: 3,
            }
        }]
    }
};

class UserStats extends React.Component {
    constructor(props) {
        super(props);

        const today = moment();
        const labels = [];
        for (let i = 5; i > 0; i--) {
            labels.push(today.clone().subtract(i, 'M').format("MMMM").toLowerCase());
        }

        this.state = {
            weight: { labels, datasets: [{ ...datasetsTemplate, data: [96, 91, 88, 84, 82] }] },
            fat: { labels, datasets: [{ ...datasetsTemplate, data: [100, 94, 87, 80, 76] }] },
            size: { labels, datasets: [{ ...datasetsTemplate, data: [65, 63, 61, 59, 58] }] },
        };
    }

    render() {

        return (
            <div className="px-2">
                <Graph data={this.state.weight} options={options} title={"GEWICHT"} subtitle={"Verlies"} badge={"14 kg"} />
                <Graph data={this.state.fat} options={options} title={"VETGEHALTE"} subtitle={"Verlies"} badge={"24 %"} />
                <Graph data={this.state.size} options={options} title={"OMVANG"} subtitle={"Verlies"} badge={"7 cm"} />
            </div>
        );
    }
}

export default UserStats;