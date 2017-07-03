import React from 'react';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Redirect} from 'react-router';
import * as paths from '../constants/routePaths';
import * as actions from '../actions/authenticationActions';
import * as routeActions from '../actions/routeActions';

class Settings extends React.Component {
    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);

        this.state = {
            redirect: false
        };
    }

    componentDidMount() {
        this.props.routeActions.setPrimaryCommandBar({
            primary: {
                name: 'Uitloggen',
                click: this.logout,
                color: 'danger'
            },
            secondary: null
        });
    }

    logout() {
        this.props.actions.logout();
        this.setState({redirect: true});
    }

    render() {
        if(this.state.redirect){
            return <Redirect to={paths.default} />;
        }
        return (
            <div />
        );
    }
}

Settings.propTypes = {
    actions: PropTypes.object.isRequired,
    routeActions: PropTypes.object.isRequired,
};

function mapStateToProps() {
    return {
    };
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
)(Settings);