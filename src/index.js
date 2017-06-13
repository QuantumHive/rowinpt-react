import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

import { Router, browserHistory } from 'react-router';
import Routes from './routes';

import '../node_modules/bootstrap/scss/bootstrap.scss';
import '../node_modules/font-awesome/scss/font-awesome.scss';
import './styles/app.scss';

const store = configureStore();

ReactDOM.render(
    <AppContainer>
        <Provider store={store}>
            <Router routes={Routes} history={browserHistory} />
        </Provider>
    </AppContainer>,
    document.getElementById('app')
);