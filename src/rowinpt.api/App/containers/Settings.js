import React from 'react';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import * as paths from '../constants/routePaths';
import * as actions from '../actions/authenticationActions';
import * as routeActions from '../actions/routeActions';
import Spinner from 'react-spinkit';
import { NavLink } from 'react-router-dom';

class Settings extends React.Component {
    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        this.props.routeActions.setPrimaryCommandBar({
            primary: {
                name: 'Uitloggen',
                click: this.logout,
                color: 'danger'
            },
            secondary: null
        });
    }

    logout() {
        this.props.actions.logout();
    }

    render() {
        if (this.props.logout) {
            if (this.props.await) {
                return (
                    <div className="d-flex justify-content-center col p-0">
                        <Spinner className="align-self-center" name="double-bounce" fadeIn="none" style={{ width: "90px", height: "90px" }} />
                    </div>
                );
            }
            return <Redirect push to={paths.default} />;
        }
        return (
            <div className="col p-0 d-flex flex-column align-items-center px-4">
                {this.props.role === "Admin" ?
                    <NavLink to="/settings/absentlist" className="btn btn-outline-primary btn-block mt-3">Afwezigen lijst</NavLink >
                    : false}
                <NavLink to="/settings/password/change" className="btn btn-outline-secondary btn-block mt-3">Wachtwoord wijzigen</NavLink >
                
            </div>
        );
    }
}

Settings.propTypes = {
    actions: PropTypes.object.isRequired,
    routeActions: PropTypes.object.isRequired,
    logout: PropTypes.bool.isRequired,
    await: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        logout: state.authenticationContext.logout,
        await: state.authenticationContext.await,
        role: state.authenticationContext.user.role

    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch),
        routeActions: bindActionCreators(routeActions, dispatch)
    };
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Settings));