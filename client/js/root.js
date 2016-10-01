'use strict';

import React, {Component} from 'react';
import {Provider} from 'react-redux';
import configureStore from './store/configure-store';

import App from './app';

const store = configureStore();

class root extends Component {
    render()
    {
        return (
            <Provider store={store}>
                <App/>
            </Provider>
        );
    }
}

export default root;