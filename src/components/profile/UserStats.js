import React from 'react';
import Graph from './Graph';
import moment from 'moment';
import { Doughnut } from 'react-chartjs-2';

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
                <Graph data={this.state.weight} options={options} title={"GEWICHT"} subtitle={"Totaal"} badge={"14 kg"} />
                <Graph data={this.state.fat} options={options} title={"VETGEHALTE"} subtitle={"Totaal"} badge={"24 %"} />
                <Graph data={this.state.size} options={options} title={"OMVANG"} subtitle={"Totaal"} badge={"7 cm"} />

                <div>
                    <hr />
                    <h3 className="mb-3">
                        Voedingsschema
                    </h3>
                    <Doughnut data={{
                        labels: [
                            'KOOLHYDRATEN',
                            'EIWITTEN',
                            'VETTEN'
                        ],
                        datasets: [{
                            data: [35, 40, 25],
                            backgroundColor: [
                                '#FF6384',
                                '#36A2EB',
                                '#FFCE56'
                            ],
                            hoverBackgroundColor: [
                                '#FF6384',
                                '#36A2EB',
                                '#FFCE56'
                            ],
                        }],

                    }} options={{
                        legend: {
                            position: 'left',
                            labels: {
                                fontSize: 14,
                                boxWidth: 25
                            }
                        },
                        cutoutPercentage: 65
                    }} />
                </div>

            </div>
        );
    }
}

export default UserStats;