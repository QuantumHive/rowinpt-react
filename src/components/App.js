import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Switch, Route, Redirect } from 'react-router';
import * as paths from '../constants/routePaths';
import * as routeActions from '../actions/routeActions';
import * as cacheActions from '../actions/cacheActions';
import * as authenticationActions from '../actions/authenticationActions';
import Routes from './common/Routes';
import Main from './common/Main';
import NavigationBar from '../components/common/NavigationBar';
import CommandBar from './common/CommandBar';
import LoginForm from './authentication/LoginForm';
import ActivateAccount from '../containers/ActivateAccount';
import Spinner from 'react-spinkit';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
    }

    componentDidMount() {
        if (!this.props.authenticationContext.isAuthenticated) {
            this.props.authenticationActions.refresh();
        } else {
            this.props.cacheActions.loadCache();
            this.props.routeActions.setPrimaryCommandBar(null);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.authenticationContext.isAuthenticated) {
            this.props.cacheActions.loadCache();
            if (this.props.routePath !== nextProps.routePath) {
                this.props.routeActions.setPrimaryCommandBar(null);
            }
        }
    }

    handleLogin(email, password) {
        this.props.authenticationActions.login(email, password);
    }

    render() {
        if (!this.props.authenticationContext.isAuthenticated) {
            if (this.props.authenticationContext.await) {
                return (
                    <Main>
                        <div className="d-flex justify-content-center col p-0">
                            <Spinner className="align-self-center" name="double-bounce" fadeIn="none" style={{ width: "90px", height: "90px" }} />
                        </div>
                    </Main>
                );
            }
            if(this.props.routePath !== paths.Activate && this.props.routePath !== paths.default){
                return <Redirect to={paths.default} />;
            }
            return (
                <Main>
                    <Switch>
                        <Route path={paths.Activate} component={ActivateAccount} />
                        <Route path={paths.default} render={() => <LoginForm handleLogin={this.handleLogin} />} />
                    </Switch>
                </Main>
            );
        }

        const role = this.props.authenticationContext.user.role;

        if (this.props.routePath === paths.default) {
            const to = role === "User" ? paths.Agenda : role === "Admin" ? paths.Users : paths.default;
            return <Redirect to={to} />;
        }

        return (
            <Main role={role}>
                <header>
                    <NavigationBar role={role} />
                </header>

                <section className="col p-0 overflow-y-auto d-flex">
                    <Routes role={role} />
                </section>

                <footer>
                    {this.props.command != null ? <CommandBar command={this.props.command} /> : false}
                </footer>
            </Main>
        );
    }
}

App.propTypes = {
    routeActions: PropTypes.object.isRequired,
    cacheActions: PropTypes.object.isRequired,
    command: PropTypes.object,
    routePath: PropTypes.string.isRequired,
    version: PropTypes.string,
    authenticationContext: PropTypes.object.isRequired,
    authenticationActions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        command: state.command,
        routePath: ownProps.location.pathname,
        authenticationContext: state.authenticationContext
    };
}

function mapDispatchToProps(dispatch) {
    return {
        routeActions: bindActionCreators(routeActions, dispatch),
        cacheActions: bindActionCreators(cacheActions, dispatch),
        authenticationActions: bindActionCreators(authenticationActions, dispatch)
    };
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(App));