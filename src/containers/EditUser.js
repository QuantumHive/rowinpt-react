import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Redirect } from 'react-router';

import _ from 'lodash';

import * as actions from '../actions/userActions';
import * as paths from '../constants/routePaths';
import UserForm from '../components/users/UserForm';

class EditUser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(user) {
        this.props.actions.editUser(user);
        this.setState({
            redirect: true,
        });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={paths.Users} />;
        }
        const user = _.find(this.props.users, {id: parseInt(this.props.match.params.id)});
        return <UserForm user={{...user}} submit="Opslaan" cache={this.props.cache} handleSubmit={this.handleSubmit} new={false} />;
    }
}

EditUser.propTypes = {
    actions: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired,
    cache: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        users: state.users.items,
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
)(EditUser);