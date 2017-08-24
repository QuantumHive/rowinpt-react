import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import * as Paths from "../constants/routePaths";
import * as RouteActions from "../actions/routeActions";
import * as CacheActions from "../actions/cacheActions";
import * as AuthenticationActions from "../actions/authenticationActions";
import Routes from "./common/Routes";
import Main from "./common/Main";
import NavigationBar from "../components/common/NavigationBar";
import CommandBar from "./common/CommandBar";
import LoginForm from "./authentication/LoginForm";
import ActivateAccount from "../containers/ActivateAccount";
import Spinner from "react-spinkit";

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
            if(this.props.routePath.split("/")[1] !== Paths.Activate.split("/")[1] && this.props.routePath !== Paths.default){
                return <Redirect to={Paths.default} />;
            }
            return (
                <Main>
                    <Switch>
                        <Route path={Paths.Activate} component={ActivateAccount} />
                        <Route path={Paths.default} render={() => <LoginForm handleLogin={this.handleLogin} />} />
                    </Switch>
                </Main>
            );
        }

        const role = this.props.authenticationContext.user.role;

        if (this.props.routePath === Paths.default) {
            const to = role === "User" ? Paths.Agenda : role === "Admin" ? Paths.Users : role === "Mod" ? Paths.Work : Paths.default;
            return <Redirect to={to} />;
        }

        return (
            <Main role={role}>
                <header>
                    <NavigationBar role={role} />
                </header>

                <section className="col p-0 overflow-y-auto d-flex" id="content">
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
        routeActions: bindActionCreators(RouteActions, dispatch),
        cacheActions: bindActionCreators(CacheActions, dispatch),
        authenticationActions: bindActionCreators(AuthenticationActions, dispatch)
    };
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(App));