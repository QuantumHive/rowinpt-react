import React from 'react';
import PropTypes from 'prop-types';
import StretchGrid from '../common/stretchgrid/StretchGrid';
import CourseDateCard from './CourseDateCard';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../actions/routeActions';

import moment from 'moment';
import _ from 'lodash';

class CourseDate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            monday: moment().weekday(0)
        };
        this.previousWeek = this.previousWeek.bind(this);
        this.nextWeek = this.nextWeek.bind(this);
    }

    componentDidMount() {
        this.props.actions.setSecondaryCommandBar(this.previousWeek, this.nextWeek);
    }

    previousWeek() {
        this.shiftWeek(-1);
    }

    nextWeek() {
        this.shiftWeek(1);
    }

    shiftWeek(direction) {
        this.setState(prevState => {
            return {
                monday: prevState.monday.clone().add(7 * direction, 'd')
            };
        });
    }

    groupDaysByLocationAndCourseType(){
        const timetable = _.filter(this.props.cache.timetable, t => t.locationId === this.props.schedule.location);
        const courses = _.filter(this.props.cache.courses, c => c.courseTypeId === this.props.schedule.courseType);
        const filterTimetable = _.filter(timetable, t => _.some(courses, c => c.id === t.courseId));
        const days = _.map(filterTimetable, t => t.day);
        return _.uniq(days);
    }

    render() {
        const monday = this.state.monday;
        const nextStep = this.props.nextStep;
        const days = this.groupDaysByLocationAndCourseType();
        const cache = this.props.cache;
        const schedule = this.props.schedule;
        const rows = [
            [
                <CourseDateCard key="1" date={monday} step={nextStep} enabled={_.includes(days, 1)} cache={cache} schedule={schedule} />,
                <CourseDateCard key="2" date={monday.clone().add(1, 'd')} step={nextStep} enabled={_.includes(days, 2)} cache={cache} schedule={schedule} />
            ],
            [
                <CourseDateCard key="3" date={monday.clone().add(2, 'd')} step={nextStep} enabled={_.includes(days, 3)} cache={cache} schedule={schedule} />,
                <CourseDateCard key="4" date={monday.clone().add(3, 'd')} step={nextStep} enabled={_.includes(days, 4)} cache={cache} schedule={schedule} />
            ],
            [
                <CourseDateCard key="5" date={monday.clone().add(4, 'd')} step={nextStep} enabled={_.includes(days, 5)} cache={cache} schedule={schedule} />,
                <CourseDateCard key="6" date={monday.clone().add(5, 'd')} step={nextStep} enabled={_.includes(days, 6)} cache={cache} schedule={schedule} />
            ],
            [
                <CourseDateCard key="7" date={monday.clone().add(6, 'd')} step={nextStep} enabled={_.includes(days, 7)} cache={cache} schedule={schedule} />,
                <div key="8" />
            ],
        ];

        return (
            <StretchGrid rows={rows} />
        );
    }

}

CourseDate.propTypes = {
    actions: PropTypes.object.isRequired,
    nextStep: PropTypes.func.isRequired,
    cache: PropTypes.object.isRequired,
    schedule: PropTypes.object.isRequired
};

function mapStateToProps() {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CourseDate);