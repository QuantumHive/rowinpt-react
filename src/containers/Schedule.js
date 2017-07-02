import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect, Switch, Route, withRouter } from 'react-router-dom';

import * as actions from '../actions/scheduleActions';

import * as paths from '../constants/routePaths';
import ScheduleLocation from '../components/schedule/Locations';
import ScheduleType from '../components/schedule/CourseTypes';
import ScheduleDate from '../components/schedule/CourseDate';
import ScheduleCourse from '../components/schedule/Course';
import ScheduleConfirm from '../components/schedule/Confirm';
import ScheduleCancel from '../components/schedule/Cancel';

import * as routeActions from '../actions/routeActions';

import _ from 'lodash';

class Schedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nextStep: props.actions.setLocation,
            cancel: null
        };

        this.submit = this.submit.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentDidMount() {
        this.props.routeActions.setPrimaryCommandBar({
            primary: {
                name: 'Inplannen',
                url: paths.ScheduleLocation
            },
            secondary: null
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.routePath !== nextProps.routePath) {
            this.determineNextStepCallback(nextProps.routePath);
        }
        if (nextProps.routePath === paths.ScheduleConfirm) {
            const existingAgenda = _.find(nextProps.agenda, { timetableId: nextProps.schedule.course, date: nextProps.schedule.date.format("D-M-Y") });
            if (existingAgenda !== undefined) {
                this.setState(prevState => {
                    return {
                        nextStep: prevState.nextStep,
                        cancel: `${paths.ScheduleCancel}/${existingAgenda.id}/${nextProps.schedule.date.format("D-M-Y")}`
                    };
                });
            }
        } else {
            this.setState(prevState => {
                return {
                    nextStep: prevState.nextStep,
                    cancel: null
                };
            });
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

    submit() {
        const date = this.props.schedule.date;
        const id = this.props.schedule.course;
        this.props.actions.addSchedule(date, id);
        this.setState({ redirect: true });
    }

    cancel(id) {
        this.props.actions.deleteSchedule(id);
        this.setState({ redirect: true });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect push to={paths.default} />;
        }
        if (this.state.cancel) {
            return <Redirect push to={this.state.cancel} />;
        }
        const nextStep = this.state.nextStep;
        const schedule = this.props.schedule;
        const cache = this.props.cache;
        const agenda = this.props.agenda;

        return (
            cache === null ? false :
                <Switch>
                    <Route path={paths.ScheduleLocation} render={() => <ScheduleLocation nextStep={nextStep} locations={cache.locations} />} />
                    <Route path={paths.ScheduleCourseType} render={() => <ScheduleType nextStep={nextStep} cache={cache} location={schedule.location} />} />
                    <Route path={paths.ScheduleDate} render={() => <ScheduleDate nextStep={nextStep} cache={cache} schedule={schedule} />} />
                    <Route path={paths.ScheduleCourse} render={() => <ScheduleCourse nextStep={nextStep} cache={cache} schedule={schedule} />} />
                    <Route path={paths.ScheduleConfirm} render={() => <ScheduleConfirm schedule={schedule} cache={cache} submit={this.submit} />} />
                    <Route path={paths.ScheduleCancel + "/:id/:date"} render={props => <ScheduleCancel agenda={agenda} cache={cache} cancel={this.cancel} {...props} />} />
                </Switch>);
    }
}

Schedule.propTypes = {
    schedule: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    routePath: PropTypes.string.isRequired,
    cache: PropTypes.object,
    agenda: PropTypes.array,
    routeActions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
    return {
        schedule: state.schedule,
        routePath: ownProps.location.pathname,
        cache: state.cache,
        agenda: state.agenda
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch),
        routeActions: bindActionCreators(routeActions, dispatch),
    };
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Schedule));