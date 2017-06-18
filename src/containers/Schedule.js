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
        props.actions.loadCache();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.routePath !== nextProps.routePath) {
            this.determineNextStepCallback(nextProps.routePath);
        }
    }

    determineNextStepCallback(routePath) {
        switch (routePath) {
            case paths.ScheduleLocation:
                this.setNextStepCallback(this.props.actions.setLocation);
                break;
            case paths.ScheduleCourseType:
                this.setNextStepCallback(this.props.actions.setCourseType);
                break;
            case paths.ScheduleDate:
                this.setNextStepCallback(this.props.actions.setDate);
                break;
            case paths.ScheduleCourse:
                this.setNextStepCallback(this.props.actions.setCourse);
                break;
            case paths.ScheduleConfirm:
            default:
                this.setNextStepCallback(null);
                break;
        }
    }

    setNextStepCallback(action) {
        this.setState({ nextStep: action });
    }

    render() {
        const nextStep = this.state.nextStep;
        const schedule = this.props.schedule;
        const cache = this.props.cache;

        return (
            cache === null ? false :
            <Switch>
                <Route path={paths.ScheduleLocation} render={() => <ScheduleLocation nextStep={nextStep} locations={cache.locations} />} />
                <Route path={paths.ScheduleCourseType} render={() => <ScheduleType nextStep={nextStep} cache={cache} location={schedule.location} />} />
                <Route path={paths.ScheduleDate} render={() => <ScheduleDate nextStep={nextStep} cache={cache} />} />
                <Route path={paths.ScheduleCourse} render={() => <ScheduleCourse nextStep={nextStep} cache={cache} />} />
                <Route path={paths.ScheduleConfirm} render={() => <ScheduleConfirm schedule={schedule} cache={cache} />} />
            </Switch>);
    }
}

Schedule.propTypes = {
    schedule: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    routePath: PropTypes.string.isRequired,
    cache: PropTypes.object
};

function mapStateToProps(state, ownProps) {
    return {
        schedule: state.schedule,
        routePath: ownProps.location.pathname,
        cache: state.cache
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