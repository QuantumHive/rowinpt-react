import React from "react";
import PropTypes from "prop-types";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { Redirect } from "react-router-dom";

import * as Actions from "../actions/userActions";
import * as Paths from "../constants/routePaths";
import UserForm from "../components/users/UserForm";

class NewUser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(user) {
        event.preventDefault();
        this.props.actions.addUser(user);
        this.setState({
            redirect: true
        });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={Paths.Users} />;
        }
        return <UserForm submit="Aanmaken" cache={this.props.cache} handleSubmit={this.handleSubmit} newUser={true} />;
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
        actions: bindActionCreators(Actions , dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewUser);