import React from "react";
import PropTypes from "prop-types";

import InlineDateControl from "../common/formcontrols/InlineDateControl";
import UserSubscriptionPicker from "./UserSubscriptionPicker";

import Moment from "moment";

class UserForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: props.user === undefined ? {
                firstName: "",
                lastName: "",
                email: "",
                mobile: "",
                birthdate: "",
                startdate: Moment().format(),
                customerId: "",
                male: null,
                female: null,
                subscriptions: [],
                emailConfirmed: false
            } : props.user
        };

        if (this.state.user.customerId === null) {
            this.state.user.customerId = "";
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubscriptionChange = this.handleSubscriptionChange.bind(this);
        this.handleBirthdate = this.handleBirthdate.bind(this);
        this.handleStartdate = this.handleStartdate.bind(this);
        this.resendActivation = this.resendActivation.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.handleSubmit(this.state.user);
    }

    handleBirthdate(date) {
        this.setState(prevState => {
            var newState = { ...prevState };
            newState.user.birthdate = date;
            return newState;
        });
    }

    handleStartdate(date) {
        this.setState(prevState => {
            var newState = { ...prevState };
            newState.user.startdate = date;
            return newState;
        });
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        if (name === "sex") {
            this.setState(prevState => {
                const newState = { ...prevState };
                newState.user.male = value === "male";
                newState.user.female = value === "female";
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

    handleSubscriptionChange(subscriptions) {
        this.setState(prevState => {
            const newState = { ...prevState };
            newState.user.subscriptions = subscriptions;
            return newState;
        });
    }

    resendActivation() {
        this.props.handleResendActivation(this.state.user.email);
    }

    render() {
        return (
            <form className="col p-3" autoComplete="off" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="first-name">Voornaam</label>
                    <input className="form-control" type="text" id="first-name" required="required" name="firstName" value={this.state.user.firstName} onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="last-name">Achternaam</label>
                    <input className="form-control" type="text" id="last-name" required="required" name="lastName" value={this.state.user.lastName} onChange={this.handleChange} />
                </div>
                {this.props.newUser || !this.state.user.emailConfirmed ?
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input className="form-control" type="email" id="email" required="required" name="email" value={this.state.user.email} onChange={this.handleChange} />
                    </div> : false}
                <div className="form-group">
                    <label htmlFor="mobile">Mobiel</label>
                    <input className="form-control" type="tel" id="mobile" required="required" name="mobile" value={this.state.user.mobile} onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="customerid">Klantnummer</label>
                    <input className="form-control" type="number" id="customerid" name="customerId" value={this.state.user.customerId} onChange={this.handleChange} />
                </div>

                <InlineDateControl label="Geboortedatum"
                    handleChange={this.handleBirthdate}
                    date={this.state.user.birthdate}
                    required={false} />

                {this.props.newUser ?
                    <fieldset className="form-group">
                        <legend className="col-form-legend">Geslacht</legend>
                        <label className="custom-control custom-radio">
                            <input type="radio" className="custom-control-input" value="male" name="sex" required="required" checked={this.state.user.male} onChange={this.handleChange} />
                            <span className="custom-control-indicator" />
                            <span className="custom-control-description">Man</span>
                        </label>


                        <label className="custom-control custom-radio">
                            <input type="radio" className="custom-control-input" value="female" name="sex" required="required" checked={this.state.user.female} onChange={this.handleChange} />
                            <span className="custom-control-indicator" />
                            <span className="custom-control-description">Vrouw</span>
                        </label>
                    </fieldset> : false}

                <UserSubscriptionPicker courseTypes={this.props.cache.coursetypes}
                    subscriptions={this.props.cache.subscriptions}
                    handleChange={this.handleSubscriptionChange}
                    selectedSubscriptions={this.state.user.subscriptions} />

                {this.props.newUser ? <InlineDateControl label="Startdatum"
                    date={this.state.user.startdate}
                    handleChange={this.handleStartdate}
                    required={true} /> : false}

                {this.props.newUser || !this.state.user.emailConfirmed ?
                    <button type="button" className="btn btn-outline-warning btn-block btn-lg mt-4 mb-2" onClick={this.resendActivation}>Opnieuw activeren</button>
                    : false}

                <button type="submit" className="btn btn-outline-success btn-block btn-lg mt-4 mb-2">{this.props.submit}</button>
            </form>
        );
    }
}

UserForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submit: PropTypes.string.isRequired,
    cache: PropTypes.object.isRequired,
    newUser: PropTypes.bool.isRequired,
    user: PropTypes.object,
    handleResendActivation: PropTypes.func
};

export default UserForm;