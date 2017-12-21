import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { changePassword, reset } from "../actions/changePasswordActions";

class ChangePassword extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPassword: "",
            password: "",
            repeat: "",
            attempt: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.props.reset();
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.password !== this.state.repeat) {
            this.setState(prevState => {
                const newState = { ...prevState };
                newState.attempt = true;
                return newState;
            });
            return;
        }

        this.props.changePassword({
            password: this.state.password,
            currentPassword: this.state.currentPassword
        });
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState(prevState => {
            const newState = { ...prevState };
            newState[name] = value;
            return newState;
        });
    }

    render() {
        if (this.props.success) {
            return <Redirect to="/" />;
        }

        const formControlDanger = this.state.attempt ? "form-control is-invalid" : "form-control";
        const wrongPass = this.props.error ? "form-control is-invalid" : "form-control";

        return (
            <form className="col p-3" autoComplete="off" onSubmit={this.handleSubmit}>
                <h4 className="mb-3">
                    Wachtwoord wijzigen
                </h4>

                <div className="form-group">
                    <label htmlFor="current-password">Huidige wachtwoord</label>
                    <input type="password" className={wrongPass} id="current-password" name="currentPassword" placeholder="Huidige wachtwoord" required="required" onChange={this.handleChange} />
                    {this.props.error ? <div className="invalid-feedback">Verkeerd wachtwoord</div> : false}
                </div>

                <div className="form-group">
                    <label htmlFor="password">Nieuwe wachtwoord</label>
                    <input type="password" className={formControlDanger} id="password" name="password" placeholder="Nieuwe wachtwoord" required="required" onChange={this.handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="repeat-password">Herhaal nieuwe wachtwoord</label>
                    <input type="password" className={formControlDanger} id="repeat-password" name="repeat" placeholder="Herhaal nieuwe wachtwoord" required="required" onChange={this.handleChange} />
                    {this.state.attempt ? <div className="invalid-feedback">Wachtwoorden komen niet overeen</div> : false }
                </div>

                <button type="submit" className="btn btn-outline-success btn-block btn-lg mt-4 mb-2">Wijzigen</button>
            </form>
        );
    }
}

function mapStateToProps(state) {
    return {
        success: state.changePassword.success,
        error: state.changePassword.error
    };
}

function mapDispatchToProps(dispatch) {
    return {
        changePassword: data => dispatch(changePassword(data)),
        reset: () => dispatch(reset())
};
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChangePassword);