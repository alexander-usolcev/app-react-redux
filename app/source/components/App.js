import React, { PureComponent } from 'react';
import { Route, withRouter } from 'react-router';

import Index from '../containers/index';
import Socket from '../containers/socket';

import Counter from '../containers/common/Counter';

const App = () => (
    <div>
        <Counter />

        <Route path="/" component={Index} exact />
        <Route path="/socket" component={Socket} />
    </div>
);

export default withRouter(App);
