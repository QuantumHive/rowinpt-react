import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Navigation from '../containers/Navigation';
import CommandBar from './common/CommandBar';

class App extends React.Component {
    render() {
        return (
            <div className="d-flex flex-column" id="root">
                <header>
                    <Navigation routePath={this.props.location.pathname} />
                </header>

                <section className="content">
                    {this.props.children}
                </section>

                <footer>
                    <CommandBar command={this.props.command} />
                </footer>
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.element,
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