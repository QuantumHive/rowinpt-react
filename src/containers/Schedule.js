import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';

import * as actions from '../actions/scheduleActions';

import * as paths from '../constants/routePaths';
import ScheduleLocation from '../components/schedule/Locations';
import ScheduleType from '../components/schedule/CourseTypes';
import ScheduleDate from '../components/schedule/CourseDate';
import ScheduleCourse from '../components/schedule/Course';
import ScheduleConfirm from '../components/schedule/Confirm';

class Schedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nextStep: props.actions.setLocation
        };
    }

    render() {
        const nextStep = this.state.nextStep;
        return (
            <Switch>
                <Route path={paths.ScheduleLocation} render={() => <ScheduleLocation nextStep={nextStep} />} />
                <Route path={paths.ScheduleCourseType} component={ScheduleType} />
                <Route path={paths.ScheduleDate} component={ScheduleDate} />
                <Route path={paths.ScheduleCourse} component={ScheduleCourse} />
                <Route path={paths.ScheduleConfirm} render={() => <ScheduleConfirm scheduleState={this.props.schedule} />} />
            </Switch>);
    }
}

Schedule.propTypes = {
    schedule: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        schedule: state.schedule,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Schedule));