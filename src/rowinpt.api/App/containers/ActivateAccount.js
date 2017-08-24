import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Redirect, withRouter } from "react-router-dom";
import QueryString from "query-string";
import * as actions from "../actions/authenticationActions";

class ActivateAccount extends React.Component {
    constructor(props) {
        super(props);
        const parsed = QueryString.parse(props.location.search);
        this.state = {
            id: parsed.id,
            code: parsed.code,
            password: "",
            repeat: "",
            attempt: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        if(this.state.password !== this.state.repeat){
            this.setState(prevState => {
                const newState = {...prevState};
                newState.attempt = true;
                return newState;
            });
            return;
        }

        this.props.actions.activateAccount({
            id: this.state.id,
            code: this.state.code,
            password: this.state.password
        });
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState(prevState => {
            const newState = { ...prevState };
            newState[name]= value;
            return newState;
        });
    }

    render() {

        if(this.props.isConfirmed){
            return <Redirect to="/"/>;
        }

        const hasDanger = this.state.attempt ? "form-group has-danger" : "form-group";
        const formControlDanger = this.state.attempt ? "form-control form-control-danger" : "form-control";
        return (
            <form className="col p-3 mt-3" autoComplete="off" onSubmit={this.handleSubmit}>
                <h2>
                    Activeer je account
                    <p>
                        <small className="text-muted">Maak hieronder je nieuwe wachtwoord aan</small>
                    </p>
                </h2>
                <div className={hasDanger}>
                    <label htmlFor="password">Nieuwe wachtwoord</label>
                    <input type="password" className={formControlDanger} id="password" name="password" placeholder="Nieuwe wachtwoord" required="required" onChange={this.handleChange}/>
                </div>

                <div className={hasDanger}>
                    <label htmlFor="repeat-password">Herhaal wachtwoord</label>
                    <input type="password" className={formControlDanger} id="repeat-password" name="repeat" placeholder="Herhaal wachtwoord" required="required" onChange={this.handleChange}/>
                    {this.state.attempt ?
                    <div className="form-control-feedback">Wachtwoorden komen niet overeen</div>
                    : false }
                </div>

                <button type="submit" className="btn btn-outline-success btn-block btn-lg mt-4 mb-2">Activeer</button>
            </form>
        );
    }
}

ActivateAccount.propTypes = {
    match: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    isConfirmed: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    return {
        isConfirmed: state.authenticationContext.isConfirmed
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(ActivateAccount));