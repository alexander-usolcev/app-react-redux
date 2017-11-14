import React from 'react';

import Counter from '../../containers/common/Counter';
import Footer from './Footer';
import DevTools from '../../containers/DevTools';

const Layout = (props) => (
	<div>
		<Counter />

		{props.children}

		<Footer />

		<DevTools />
	</div>
);

export default Layout;
