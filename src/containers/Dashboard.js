import React from 'react';
import DashboardList from '../components/dashboard/DashboardList';

class Dashboard extends React.Component {
    render() {
        const agenda = [
            {
                id: 1,
                date: "maandag 12 juni",
                courses: [{
                    id: 1,
                    start: "12:00",
                    end: "13:00",
                    type: "Groepsles"
                },
                {
                    id: 2,
                    start: "19:30",
                    end: "20:30",
                    type: "Small Group"
                }
                ]
            },
            {
                id: 2,
                date: "woensdag 14 juni",
                courses: [{
                    id: 3,
                    start: "16:00",
                    end: "17:00",
                    type: "Personal Training"
                }]
            }
        ];
        return (
            <div>
                <DashboardList agenda={agenda} />
            </div>
        );
    }
}

export default Dashboard;