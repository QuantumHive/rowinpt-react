import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class Schedule extends React.Component {
    render() {
        return this.props.children;
    }
}

Schedule.propTypes = {
    children: PropTypes.object.isRequired
};

export default connect(
)(Schedule);