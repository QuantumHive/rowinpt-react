import React from 'react';
import PropTypes from 'prop-types';

import { Provider } from 'react-redux';
import { Router } from 'react-router';

import routes from '../routes';

class Root extends React.Component {
    render() {
        const { store, history } = this.props;
        return (
            <Provider store={store}>
                <Router routes={routes} history={history} />
            </Provider>
        );
    }
}

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default Root;