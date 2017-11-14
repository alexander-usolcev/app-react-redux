import 'lie/polyfill';
import 'whatwg-fetch';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
// import { ConnectedRouter } from 'react-router-redux';
import { ConnectedRouter } from 'connected-react-router';


import history from './history';
import store from './store';

import App from './components/App';

import '../assets/css/style.less';


const render = Component => {
	ReactDOM.render(
		<AppContainer>
			<Provider store={store}>
				<ConnectedRouter history={history}>
					<Component />
				</ConnectedRouter>
			</Provider>
		</AppContainer>,

		document.getElementById('app')
	)
};

render(App);


if (module.hot) {
	module.hot.accept('./components/App', () => {
		render(App);
	});
}