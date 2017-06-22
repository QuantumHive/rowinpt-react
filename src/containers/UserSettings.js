import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import { bindActionCreators } from 'redux';
import * as paths from '../constants/routePaths';
import * as actions from '../actions/userActions';
import Users from '../components/users/Users';
import NewUser from '../components/users/NewUser';

class UserSettings extends React.Component {
    constructor(props) {
        super(props);
        props.actions.loadUsers();
        this.addUser = this.addUser.bind(this)
    }

    addUser(user){
    }

    render() {
        return (
            <div className="col p-0">
                <Route exact path={paths.UserSettings} render={props => <Users users={this.props.users} {...props} />} />
                <Route exact path={paths.NewUser} render={props => <NewUser submitCallback={this.addUser} {...props} />} />
            </div>
        );
    }
}

UserSettings.propTypes = {
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
)(UserSettings);