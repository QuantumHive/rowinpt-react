import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../actions/scheduleActions';
import DashboardList from '../components/dashboard/DashboardList';

class Dashboard extends React.Component {
    render() {
        const agenda = this.props.agenda;
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
    return {
        agenda: state.agenda,
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
)(Dashboard);