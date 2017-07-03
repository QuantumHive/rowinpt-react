import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as paths from '../constants/routePaths';
import * as actions from '../actions/dashboardActions';
import * as routeActions from '../actions/routeActions';
import DashboardList from '../components/dashboard/DashboardList';

import _ from 'lodash';
import moment from 'moment';
import Spinner from 'react-spinkit';

class Dashboard extends React.Component {
    componentDidMount() {
        this.props.actions.loadAgenda();

        this.props.routeActions.setPrimaryCommandBar({
            primary: {
                name: 'Inplannen',
                url: paths.ScheduleLocation
            },
            secondary: null
        });
    }

    componentWillReceiveProps() {
    }

    render() {
        if (this.props.agenda.isLoading) {
            return (
                <div className="d-flex justify-content-center col p-0">
                    <Spinner className="align-self-center" name="double-bounce" fadeIn="half" style={{ width: "90px", height: "90px" }} />
                </div>
            );
        }
        
        const now = moment();
        const agenda = _.filter(this.props.agenda.items, a => now.isSameOrBefore(moment(a.date, "D-M-Y"), 'd'));
        return (
            <div className="col p-0 d-flex">
                <DashboardList agenda={agenda} />
            </div>
        );
    }
}

Dashboard.propTypes = {
    agenda: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    routeActions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    // const agenda = _.orderBy(state.agenda.items.map(a => {
    //     const timetable = _.find(cache.timetable, { id: a.timetableId });
    //     const course = _.find(cache.courses, { id: timetable.courseId });
    //     const location = _.find(cache.locations, { id: timetable.locationId });
    //     return {
    //         id: a.id,
    //         date: moment(a.date, "D-M-Y"),
    //         start: timetable.start,
    //         end: timetable.end,
    //         type: course.name,
    //         location: location.location
    //     };
    // }), ['date']);
    return { agenda: state.agenda, cache: state.cache };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch),
        routeActions: bindActionCreators(routeActions, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);