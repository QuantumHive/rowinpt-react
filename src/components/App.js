import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import * as paths from '../constants/routePaths';
import * as actions from '../actions/routeActions';
import defaultRoute from '../routes';
import NavigationBar from '../components/common/NavigationBar';
import CommandBar from './common/CommandBar';

class App extends React.Component {
    componentDidMount() {
        const primary = this.switchPrimaryContent(this.props.routePath);
        this.props.actions.setPrimaryCommandBar(primary);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.routePath !== nextProps.routePath) {
            const primary = this.switchPrimaryContent(nextProps.routePath);
            this.props.actions.setPrimaryCommandBar(primary);
        }
    }

    switchPrimaryContent(routePath) {
        switch (routePath) {
            case paths.default:
                return {
                    primary: {
                        name: 'Inplannen',
                        url: paths.ScheduleLocation
                    },
                    secondary: null
                };
            case paths.UserSettings:
                return {
                    primary: {
                        name: 'Klant toevoegen',
                        url: paths.NewUser
                    },
                    secondary: null
                };
            default:
                return null;
        }
    }

    render() {
        return (
            <div className="d-flex flex-column" id="root">
                <small style={{position: "fixed", userSelect: "none", cursor: "default", zIndex: "999"}}>v{this.props.version}</small>
                
                <header>
                    <NavigationBar />
                </header>

                <section className="col p-0 overflow-y-auto d-flex">
                    {defaultRoute}
                </section>

                <footer>
                    {this.props.command != null ? <CommandBar command={this.props.command} /> : false}
                </footer>
            </div>
        );
    }
}

App.propTypes = {
    actions: PropTypes.object.isRequired,
    command: PropTypes.object,
    routePath: PropTypes.string.isRequired,
    version: PropTypes.string
};

function mapStateToProps(state, ownProps) {
    return {
        command: state.command,
        routePath: ownProps.location.pathname
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
)(App));