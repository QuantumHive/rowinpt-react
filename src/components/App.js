import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router';

import * as routeActions from '../actions/routeActions';
import * as cacheActions from '../actions/cacheActions';
import * as authenticationActions from '../actions/authenticationActions';
import Routes from '../routes';
import NavigationBar from '../components/common/NavigationBar';
import CommandBar from './common/CommandBar';
import LoginForm from './authentication/LoginForm';
import ActivateAccount from '../containers/ActivateAccount';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
    }

    componentDidMount() {
        if (!this.props.authenticationContext.isAuthenticated) {
            this.props.authenticationActions.refresh();
        }

        this.props.cacheActions.loadCache();
        this.props.routeActions.setPrimaryCommandBar(null);
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.authenticationContext.isAuthenticated) return;

        this.props.cacheActions.loadCache();

        if (this.props.routePath !== nextProps.routePath) {
            this.props.routeActions.setPrimaryCommandBar(null);
        }
    }

    handleLogin(email, password) {
        this.props.authenticationActions.login(email, password);
    }

    render() {
        const navbar = this.props.authenticationContext.isAuthenticated ? <header><NavigationBar role={this.props.authenticationContext.user.role} /></header> : false;

        const content = this.props.authenticationContext.isAuthenticated ? (
            <section className="col p-0 overflow-y-auto d-flex">
                <Routes role={this.props.authenticationContext.user.role} />
            </section>) : <LoginForm handleLogin={this.handleLogin} />;

        return (
            <div className="d-flex flex-column" id="root">
                <small style={{ position: "fixed", userSelect: "none", cursor: "default", zIndex: "999" }}>v{this.props.version}</small>

                <Switch>
                    <Route path="/activate/:id/:code" component={ActivateAccount} />
                    <Route path="/" render={() => navbar} />
                </Switch>

                <Switch>
                    <Route path="/activate" render={() => false} />
                    <Route path="/" render={() => content} />
                </Switch>
                
                <footer>
                    {this.props.command != null ? <CommandBar command={this.props.command} /> : false}
                </footer>

            </div >
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