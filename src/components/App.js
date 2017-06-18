import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import * as actions from '../actions/routeActions';
import defaultRoute from '../routes';
import NavigationBar from '../components/common/NavigationBar';
import CommandBar from './common/CommandBar';

class App extends React.Component {

    componentDidMount() {
        this.props.actions.setCommandBar(this.props.routePath);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.routePath !== nextProps.routePath) {
            this.props.actions.setCommandBar(nextProps.routePath);
        }
    }

    render() {
        return (
            <div className="d-flex flex-column" id="root">
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
    routePath: PropTypes.string.isRequired
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