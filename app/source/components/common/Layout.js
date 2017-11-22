import React from 'react';

import Counter from '../../containers/common/Counter';
import Footer from './Footer';
// import DevTools from '../../containers/DevTools';

import { isDev } from '../../utils/index';

const Layout = props => (
	<div>
		<Counter />

		{props.children}

		<Footer />

		{isDev() && <DevTools />}
	</div>
);

export default Layout;
