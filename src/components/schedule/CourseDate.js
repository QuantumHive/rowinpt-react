import React from 'react';
import PropTypes from 'prop-types';
import StretchGrid from '../common/stretchgrid/StretchGrid';
import CourseDateCard from './CourseDateCard';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../actions/routeActions';

import moment from 'moment';

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

    render() {
        const monday = this.state.monday;
        const nextStep = this.props.nextStep;

        const rows = [
            [
                <CourseDateCard key="1" date={monday} step={nextStep} />,
                <CourseDateCard key="2" date={monday.clone().add(1, 'd')} step={nextStep} />
            ],
            [
                <CourseDateCard key="3" date={monday.clone().add(2, 'd')} step={nextStep} />,
                <CourseDateCard key="4" date={monday.clone().add(3, 'd')} step={nextStep} />
            ],
            [
                <CourseDateCard key="5" date={monday.clone().add(4, 'd')} step={nextStep} />,
                <CourseDateCard key="6" date={monday.clone().add(5, 'd')} step={nextStep} />
            ],
            [
                <CourseDateCard key="7" date={monday.clone().add(6, 'd')} step={nextStep} />,
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
    nextStep: PropTypes.func.isRequired
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