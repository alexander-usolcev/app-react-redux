import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';

import history from '../history';
import reducers from '../reducers';


const historyMiddleware = routerMiddleware(history);
const loggerMiddleware = createLogger({ collapsed: true });

export default function configureStore() {
    let middleware = [thunkMiddleware, historyMiddleware];

    if (process.env.NODE_ENV !== 'production') {
        middleware = [...middleware, loggerMiddleware];
    }

    return createStore(
        reducers,
        applyMiddleware(...middleware)
    );
}