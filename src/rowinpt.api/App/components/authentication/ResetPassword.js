import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Axios from "axios";
import QueryString from "query-string";

class ResetPassword extends React.Component {
    constructor(props) {
        super(props);

        const parsed = QueryString.parse(props.location.search);
        this.state = {
            id: parsed.id,
            code: parsed.code,
            password: "",
            repeat: "",
            attempt: false,
            redirect: false,
            error: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        event.stopPropagation();
        if (this.state.password !== this.state.repeat) {
            this.setState(prevState => {
                const newState = { ...prevState };
                newState.attempt = true;
                return newState;
            });
            return;
        }

        Axios.post("/api/account/reset",
            {
                id: this.state.id,
                code: this.state.code,
                password: this.state.password
            }).then(response => {
                this.setState({ redirect: true });
            }).catch(error => {
                this.setState({ error: true });
            });
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState(prevState => {
            const newState = { ...prevState };
            newState[name] = value;
            newState.error = false;
            return newState;
        });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/" />;
        }
        const formControlDanger = this.state.attempt ? "form-control is-invalid" : "form-control";
        return (
            <form className="col p-3 mt-3" autoComplete="off" onSubmit={this.handleSubmit}>
                <h3>
                    Wachtwoord resetten
                    <p>
                        <small className="text-muted">Herstel hieronder je wachtwoord</small>
                    </p>
                </h3>
                

                {this.state.error ?
                    <div className="alert alert-danger" role="alert">
                        Er is een fout opgetreden. Probeer het nogmaals.
                    </div>
                    : false
                }

                <div className="form-group">
                    <label htmlFor="password">Nieuwe wachtwoord</label>
                    <input type="password" className={formControlDanger} id="password" name="password" placeholder="Nieuwe wachtwoord" required="required" onChange={this.handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="repeat-password">Herhaal wachtwoord</label>
                    <input type="password" className={formControlDanger} id="repeat-password" name="repeat" placeholder="Herhaal wachtwoord" required="required" onChange={this.handleChange} />
                    {this.state.attempt ?
                        <div className="invalid-feedback">Wachtwoorden komen niet overeen</div>
                        : false}
                </div>

                <button type="submit" className="btn btn-outline-success btn-block btn-lg mt-4 mb-2">Reset</button>
            </form>
        );
    }
}

export default connect()(ResetPassword);