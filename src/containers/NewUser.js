import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/userActions';
import * as paths from '../constants/routePaths';
import UserForm from '../components/users/UserForm';

class NewUser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: "",
                lastName: "",
                email: "",
                mobile: "",
                birthdateDay: "",
                birthdateMonth: "",
                birthdateYear: "",
                male: null,
                female: null,
                attendedTrainingSubscription: "",
                smallGroupSubscription: "",
                groupTrainingSubscription: ""
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

        switch (name) {
            case "birthdateDay":
                if (value === "") break;
                if (isNaN(value)) return;
                if (value < 1 || value > 31) return;
                break;
            case "birthdateYear":
                if (value === "") break;
                if (isNaN(value)) return;
                if (value.length > 4) return;
                if (value < 0) return;
                break;
            case "sex":
                this.setState(prevState => {
                    const newState = { ...prevState };
                    newState.user.male = value === "male";
                    newState.female = value === "female";
                    return newState;
                });
                return;
        }

        this.setState(prevState => {
            const newState = { ...prevState };
            newState.user[name] = value;
            return newState;
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.actions.addUser(this.state.user);
        this.setState({
            redirect: true,
        });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={paths.UserSettings} />;
        }
        return <UserForm user={{...this.state.user}} handleSubmit={this.handleSubmit} handleChange={this.handleChange} />;
    }
}

NewUser.propTypes = {
    actions: PropTypes.object.isRequired,
};

function mapStateToProps() {
    return {};
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