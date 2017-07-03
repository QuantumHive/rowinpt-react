import React from 'react';
import PropTypes from 'prop-types';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

class Root extends React.Component {
    render() {
        return (
            <Provider store={this.props.store}>
                <BrowserRouter basename="/">
                    <App />
                </BrowserRouter>
            </Provider>
        );
    }
}

Root.propTypes = {
    store: PropTypes.object.isRequired
};

export default Root;