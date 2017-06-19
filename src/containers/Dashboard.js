import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../actions/scheduleActions';
import DashboardList from '../components/dashboard/DashboardList';

import _ from 'lodash';
import moment from 'moment';

class Dashboard extends React.Component {

    render() {
        const now = moment();
        const agenda = _.filter(this.props.agenda, a => now.isSameOrBefore(moment(a.date, "D-M-Y"), 'd'));
        return (
            <div className="col p-0 d-flex">
                <DashboardList agenda={agenda} />
            </div>
        );
    }
}

Dashboard.propTypes = {
    agenda: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    const cache = state.cache;
    const agenda = _.orderBy(state.agenda.map(a => {
        const timetable = _.find(cache.timetable, {id: a.timetableId });
        const course = _.find(cache.courses, {id: timetable.courseId});
        const location = _.find(cache.locations, {id: timetable.locationId});
        return {
            id: a.id,
            date: moment(a.date, "D-M-Y"),
            start: timetable.start,
            end: timetable.end,
            type: course.name,
            location: location.location
        };
    }), ['date']);
    return { agenda };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);