import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/userActions';
import UserTable from '../components/users/UserTable';

class Users extends React.Component {
    constructor(props) {
        super(props);
        props.actions.loadUsers();
    }

    render() {
        return (
            <div>
                <UserTable users={this.props.users} />
            </div>
        );
    }
}

Users.propTypes = {
    users: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        users: state.user
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