import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import history from '../history';
import reducers from '../reducers';

export default function configureStore(initialState) {
	let middleware = [routerMiddleware(history), thunkMiddleware];

	return createStore(
		connectRouter(history)(reducers),
		initialState,
		applyMiddleware(...middleware)
	);
}