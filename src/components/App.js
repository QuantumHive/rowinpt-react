import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Navigation from '../containers/Navigation';
import CommandBar from './common/CommandBar';

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