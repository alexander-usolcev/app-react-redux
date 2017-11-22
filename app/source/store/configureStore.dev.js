import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
// import { routerMiddleware } from 'react-router-redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import DevTools from '../containers/DevTools';
import history from '../history';
import reducers from '../reducers';
import { persistState } from 'redux-devtools';

function getDebugSessionKey() {
	const matches = window.location.href.match(/[?&]debug_session=([^&#]+)\b/);
	return (matches && matches.length > 0) ? matches[1] : null;
}

// const historyMiddleware = routerMiddleware(history);
const loggerMiddleware = createLogger({ collapsed: true });


export default function configureStore(initialState) {
	// let middleware = [thunkMiddleware, historyMiddleware];
	let middleware = [routerMiddleware(history), thunkMiddleware, loggerMiddleware];

	return createStore(
		connectRouter(history)(reducers),
		// reducers,
		initialState,
		compose(
			applyMiddleware(...middleware),
			DevTools.instrument(),
			persistState(getDebugSessionKey())
		)
	);
}