import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/userActions';
import * as paths from '../constants/routePaths';

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
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input className="form-control" type="email" id="email" required="required" name="email" value={this.state.user.email} onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="mobile">Mobiel</label>
                    <input className="form-control" type="tel" id="mobile" required="required" name="mobile" value={this.state.user.mobile} onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label>Geboortedatum</label>
                    <div className="d-flex flex-row flex-nowrap">
                        <input className="form-control mr-2 col-3" type="number" required="required" placeholder="dag" name="birthdateDay" value={this.state.user.birthdateDay} onChange={this.handleChange} step="1" min="1" max="31" />
                        <select className="form-control col mr-2 custom-select" required="required" name="birthdateMonth" value={this.state.userbirthdateMonth} onChange={this.handleChange}>
                            <option value="" disabled="disabled" hidden="hidden">maand</option>
                            <option value="1">januari</option>
                            <option value="2">februari</option>
                            <option value="3">maart</option>
                            <option value="4">april</option>
                            <option value="5">mei</option>
                            <option value="6">juni</option>
                            <option value="7">juli</option>
                            <option value="8">augustus</option>
                            <option value="9">september</option>
                            <option value="10">oktober</option>
                            <option value="11">november</option>
                            <option value="12">december</option>
                        </select>
                        <input className="form-control col-3" type="number" required="required" placeholder="jaar" name="birthdateYear" value={this.state.user.birthdateYear} onChange={this.handleChange} step="1" min="0" max="9999" />
                    </div>
                </div>

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
                </fieldset>

                <fieldset className="form-group">
                    <legend>Abonnementen</legend>
                    <label htmlFor="attended-training-subscription">Begeleid sporten</label>
                    <select className="custom-select form-control" id="attended-training-subscription" name="attendedTrainingSubscription" value={this.state.user.attendedTrainingSubscription} onChange={this.handleChange}>
                        <option value="">geen</option>
                        <option value="1">1 x per week</option>
                        <option value="2">2 x per week</option>
                        <option value="3">3 x per week</option>
                    </select>
                    <label htmlFor="small-group-subscription">Small group</label>
                    <select className="custom-select form-control" id="small-group-subscription" name="smallGroupSubscription" value={this.state.user.smallGroupSubscription} onChange={this.handleChange}>
                        <option value="">geen</option>
                        <option value="1">1 x per week</option>
                        <option value="2">2 x per week</option>
                        <option value="3">3 x per week</option>
                    </select>
                    <label htmlFor="group-training-subscription">Begeleid sporten</label>
                    <select className="custom-select form-control" id="group-training-subscription" name="groupTrainingSubscription" value={this.state.user.groupTrainingSubscription} onChange={this.handleChange}>
                        <option value="">geen</option>
                        <option value="1">1 x per week</option>
                        <option disabled="disabled">2 x per week</option>
                        <option value="0">onbeperkt</option>
                    </select>
                </fieldset>

                <button type="submit" className="btn btn-outline-success btn-block btn-lg mt-4">Aanmaken</button>
            </form>
        );
    }
}

NewUser.propTypes = {
    actions: PropTypes.object.isRequired,
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
)(NewUser);