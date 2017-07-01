import React from 'react';
import PropTypes from 'prop-types';

import InlineDateControl from '../common/formcontrols/InlineDateControl';
import UserSubscriptionPicker from './UserSubscriptionPicker';

class UserForm extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            user: props.user === undefined ? {
                firstName: "",
                lastName: "",
                email: "",
                mobile: "",
                birthdateDay: "",
                birthdateMonth: "",
                birthdateYear: "",
                male: null,
                female: null,
                subscriptions: [],
            } : props.user
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubscriptionChange = this.handleSubscriptionChange.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        this.props.handleSubmit(this.state.user);
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

    handleSubscriptionChange(subscriptions){
        this.setState(prevState => {
            const newState = { ...prevState };
            newState.user.subscriptions = subscriptions;
            return newState;
        });
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
                {this.props.new ?
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input className="form-control" type="email" id="email" required="required" name="email" value={this.state.user.email} onChange={this.handleChange} />
                </div> : false}
                <div className="form-group">
                    <label htmlFor="mobile">Mobiel</label>
                    <input className="form-control" type="tel" id="mobile" required="required" name="mobile" value={this.state.user.mobile} onChange={this.handleChange} />
                </div>

                {this.props.new ? <InlineDateControl label="Geboortedatum"
                                                      handleChange={this.handleChange}
                                                      day={this.state.user.birthdateDay}
                                                      month={this.state.user.birthdateMonth}
                                                      year={this.state.user.birthdateYear} /> : false}

                {this.props.new ?
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
                                        selectedSubscriptions={this.state.user.subscriptions}/>

                <button type="submit" className="btn btn-outline-success btn-block btn-lg mt-4 mb-2">{this.props.submit}</button>
            </form>
        );
    }
}

UserForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submit: PropTypes.string.isRequired,
    cache: PropTypes.object.isRequired,
    new: PropTypes.bool.isRequired,
    user: PropTypes.object
};

export default UserForm;