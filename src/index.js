import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import configureStore from './store/configureStore';

import '../node_modules/bootstrap/scss/bootstrap.scss';
import '../node_modules/font-awesome/scss/font-awesome.scss';
import './styles/app.scss';

import Root from './components/Root';

const store = configureStore();

ReactDOM.render(
    <AppContainer>
        <Root store={store} />
    </AppContainer>,
    document.getElementById('app')
);