import React from 'react';
import PropTypes from 'prop-types';

import Navigation from '../containers/common/Navigation';
import CommandBar from './common/CommandBar';

import { connect } from 'react-redux';

class App extends React.Component {
    render() {
        return (
            <div>
                <Navigation routePath={this.props.location.pathname} />

                <div className="container-fluid p-0">
                    {this.props.children}
                </div>

                <CommandBar command={this.props.command} />
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    command: PropTypes.object
};

function mapStateToProps(state) {
    return {
        command: state.command
    };
}

export default connect(
    mapStateToProps
)(App);