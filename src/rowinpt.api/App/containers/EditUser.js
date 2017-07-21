import React from "react";
import PropTypes from "prop-types";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { Redirect } from "react-router";

import _ from "lodash";
import Axios from "axios";

import * as Actions from "../actions/userActions";
import * as Paths from "../constants/routePaths";
import UserForm from "../components/users/UserForm";
import Spinner from "react-spinkit";

class EditUser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleResendActivation = this.handleResendActivation.bind(this);
    }

    handleSubmit(user) {
        this.props.actions.editUser(user);
        this.setState({
            redirect: true
        });
    }

    handleResendActivation(email) {
        Axios.post("/api/account/resend/activation", email).then(() => {
            this.setState({
                redirect: true
            });
        });
    }

    render() {
        if (this.props.isFetching) {
            return (
                <div className="d-flex justify-content-center col p-0">
                    <Spinner className="align-self-center" name="double-bounce" fadeIn="half" style={{ width: "90px", height: "90px" }} />
                </div>);
        }
        if (this.state.redirect) {
            return <Redirect to={Paths.Users} />;
        }
        const user = _.find(this.props.users, { id: parseInt(this.props.match.params.id) });
        return <UserForm user={{ ...user }} submit="Opslaan" cache={this.props.cache} handleSubmit={this.handleSubmit} handleResendActivation={this.handleResendActivation} newUser={false} />;
    }
}

EditUser.propTypes = {
    actions: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired,
    cache: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        users: state.users.items,
        cache: state.cache,
        isFetching: state.users.isFetching
    };
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditUser);