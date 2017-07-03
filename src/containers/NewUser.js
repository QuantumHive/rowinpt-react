import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Redirect } from 'react-router';

import * as actions from '../actions/userActions';
import * as paths from '../constants/routePaths';
import UserForm from '../components/users/UserForm';

class NewUser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(user) {
        event.preventDefault();
        this.props.actions.addUser(user);
        this.setState({
            redirect: true,
        });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={paths.Users} />;
        }
        return <UserForm submit="Aanmaken" cache={this.props.cache} handleSubmit={this.handleSubmit} new={true} />;
    }
}

NewUser.propTypes = {
    actions: PropTypes.object.isRequired,
    cache: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        cache: state.cache
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
)(NewUser);