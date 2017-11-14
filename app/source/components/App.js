import React from 'react';
import { Route, withRouter } from 'react-router';

import Index from '../containers/index';
import Socket from '../containers/socket';

import Layout from './common/Layout';

const App = () => (
	<Layout>
		<Route path="/" component={Index} exact />
		<Route path="/socket" component={Socket} />
	</Layout>
);

export default withRouter(App);
