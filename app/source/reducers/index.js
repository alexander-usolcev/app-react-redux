import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { reducer as modal } from 'react-redux-easy-modal';

import userData from './userData';
import counter from './counter';

const rootReducer = combineReducers({
    userData,
    counter,
    modal,

    router
});

export default rootReducer;