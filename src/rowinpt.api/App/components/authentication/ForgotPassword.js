import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Axios from "axios";

class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            redirect: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        event.stopPropagation();

        Axios.put(`/api/account/reset/${this.state.email}`).then(response => {
            this.setState({ redirect: true });
        });
    }

    handleChange(event) {
        this.setState({ email: event.target.value });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/" />;
        }
        return (
            <form className="col p-3 mt-3" autoComplete="off" onSubmit={this.handleSubmit}>
                <h3>
                    Wachtwoord resetten
                </h3>
                <p>
                    <small className="text-muted">Voer je email hieronder en wij sturen je een email met instructies om je wachtwoord te herstellen.</small>
                </p>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" value={this.state.email} className="form-control" id="email" name="email" placeholder="Email" required="required" onChange={this.handleChange} />
                </div>

                <button type="submit" className="btn btn-outline-success btn-block btn-lg mt-4 mb-2">Reset</button>
            </form>
        );
    }
}

export default connect()(ForgotPassword);