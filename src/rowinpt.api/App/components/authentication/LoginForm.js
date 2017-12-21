import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const emailInputStyle = {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    marginBottom: "-1px",
};
const passwordInputStyle = {
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
};

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleLogin(event) {
        event.preventDefault();
        this.props.handleLogin(this.state.email, this.state.password);
    }

    handleInputChange(event) {
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
        return (
            <div className="col align-items-center pt-5">
                <form className="mb-3" autoComplete="off" onSubmit={this.handleLogin} style={{ maxWidth: "300px" }}>
                    <h3 className="mb-4" style={{ fontWeight: "normal" }}>RowinPT</h3>

                    <input type="email" className="form-control" placeholder="Email" required="required" name="email" style={emailInputStyle} onChange={this.handleInputChange} />
                    <input type="password" className="form-control" placeholder="Wachtwoord" required="required" name="password" style={passwordInputStyle} onChange={this.handleInputChange} />

                    <button type="submit" className="btn btn-outline-success btn-block btn-lg mt-4">Inloggen</button>
                </form>

                <Link to="/forgot">Wachtwoord vergeten?</Link>
            </div>
                
        );
    }

}

LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired
};

export default LoginForm;