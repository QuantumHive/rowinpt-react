import React from 'react';
import DashboardList from '../components/dashboard/DashboardList';

class Dashboard extends React.Component {
    render() {
        const agenda = [];
        for (let i = 1; i < 10; i++) {
            agenda.push({
                id: i,
                date: "maandag 12 juni",
                courses: [{
                    id: i,
                    start: "12:00",
                    end: "13:00",
                    type: "Groepsles"
                }]
            });
        }
        return (
            <div className="col p-0">
                <DashboardList agenda={agenda} />
            </div>
        );
    }
}

export default Dashboard;