import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/userActions';
import * as paths from '../constants/routePaths';
import UserForm from '../components/users/UserForm';
import _ from 'lodash';

class EditUser extends React.Component {
    constructor(props) {
        super(props);
        const user = _.find(props.users, {id: parseInt(props.match.params.id)});

        this.state = {
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                mobile: user.mobile,
                attendedTrainingSubscription: user.attendedTrainingSubscription,
                smallGroupSubscription: user.smallGroupSubscription,
                groupTrainingSubscription: user.groupTrainingSubscription
            },
            redirect: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState(prevState => {
            const newState = { ...prevState };
            newState.user[name] = value;
            return newState;
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.actions.editUser(this.state.user);
        this.setState({
            redirect: true,
        });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={paths.UserSettings} />;
        }
        return <UserForm user={{...this.state.user}} handleSubmit={this.handleSubmit} handleChange={this.handleChange} />
    }
}

EditUser.propTypes = {
    actions: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired
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
)(EditUser);