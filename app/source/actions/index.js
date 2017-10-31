import {
    ADD_USER_DATA, FETCH_USER_DATA, RECEIVED_USER_DATA,
    INCREMENT_COUNTER, DECREMENT_COUNTER,
} from '../const/actions';

import { getUserInfo } from '../helpers/user';

function shouldFetchData(state, data) {
    if (!data) {
        return true;
    } else if (state.isFetching) {
        return false;
    } else {
        return state.isFetching;
    }
}

function shouldFetchUserData(state) {
    let firstName = state.userData.firstName;

    return shouldFetchData(state.userData, firstName);
}

function fetchRequestUserData() {
    return {
        type: FETCH_USER_DATA,
        startedAt: Date.now(),
    }
}

function receivedRequestUserData(data) {
    return {
        type: RECEIVED_USER_DATA,
        receivedAt: Date.now(),
        data,
    }
}

function addUserData(userData) {
    return {
        type: ADD_USER_DATA,
        userData
    }
}

function incrementCounter() {
    return {
        type: INCREMENT_COUNTER
    }
}

function decrementCounter() {
    return {
        type: DECREMENT_COUNTER
    }
}


function fetchUserData() {
    return async dispatch => {
        dispatch(fetchRequestUserData());

        let userData = await getUserInfo();

        dispatch(receivedRequestUserData(userData));

        return dispatch(addUserData(userData));
    }
}

function fetchUserDataIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetchUserData(getState())) {
            return dispatch(fetchUserData())
        }
    }
}


export {
    addUserData,
    fetchUserDataIfNeeded,
    fetchRequestUserData,
    shouldFetchUserData,
    fetchUserData,
    incrementCounter,
    decrementCounter
};