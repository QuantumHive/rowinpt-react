import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/routeActions';
import NavigationBar from '../../components/common/NavigationBar';

class Navigation extends React.Component {
    constructor(props){
        super(props);
        props.actions.setCommandBar(props.routePath);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.routePath !== nextProps.routePath) {
            this.props.actions.setCommandBar(nextProps.routePath);
        }
    }

    componentWillUpdate(nextProps){
        document.body.classList.remove("command-bar");
        if(nextProps.isCommandEnabled){
            document.body.classList.add("command-bar");
        }
    }

    render() {
        return (
            <NavigationBar />
        );
    }
}

Navigation.propTypes = {
    actions: PropTypes.object.isRequired,
    routePath: PropTypes.string.isRequired,
    isCommandEnabled: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        isCommandEnabled: state != null
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
)(Navigation);