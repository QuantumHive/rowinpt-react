import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/userActions';
import UserTable from '../components/users/UserTable';

class Users extends React.Component {
    constructor() {
        super();
        this.actions.loadUsers();
    }

    render() {
        const { users } = this.props;
        return (
            <div>
                <UserTable users={users} />
            </div>
        );
    }
}

Users.propTypes = {
    users: PropTypes.array.isRequired,
    actions: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        users: state.users
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
)(Users);