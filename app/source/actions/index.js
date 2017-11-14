import {
    ADD_USER_DATA, FETCH_USER_DATA, RECEIVED_USER_DATA,
    INCREMENT_COUNTER, DECREMENT_COUNTER,
} from '../const/actions';

import { getUserInfo } from '../helpers/user';

/**
 * Helper проверки данных (data) в store.
 *
 * @param state
 * @param data
 * @returns {*}
 */
function shouldFetchData(state, data) {
    if (!data) {
        return true;
    } else if (state.isFetching) {
        return false;
    } else {
        return state.isFetching;
    }
}

/**
 * Helper проверки наличия данных о пользователе в store.
 *
 * @param state
 */
function shouldFetchUserData(state) {
    let firstName = state.userData.firstName;

    return shouldFetchData(state.userData, firstName);
}

/**
 * Action - начало запроса за данными о пользователе.
 *
 * @returns {{type, startedAt: number}}
 */
function fetchRequestUserData() {
    return {
        type: FETCH_USER_DATA,
        startedAt: Date.now(),
    };
}

/**
 * Action - получение данных о пользователе.
 *
 * @param data
 * @returns {{type, receivedAt: number, data: *}}
 */
function receivedRequestUserData(data) {
    return {
        type: RECEIVED_USER_DATA,
        receivedAt: Date.now(),
        data,
    };
}

/**
 * Action - добавить данные о пользователе в store.
 *
 * @param userData
 * @returns {{type, userData: *}}
 */
function addUserData(userData) {
    return {
        type: ADD_USER_DATA,
        userData
    };
}

/**
 * Action - увеличить счетчик.
 *
 * @returns {{type}}
 */
function incrementCounter() {
    return {
        type: INCREMENT_COUNTER
    };
}

/**
 * Action - уменьшить счетчик.
 *
 * @returns {{type}}
 */
function decrementCounter() {
    return {
        type: DECREMENT_COUNTER
    };
}

/**
 * Запрос к серверу за данными о пользователе.
 *
 * @returns {function(*)}
 */
function fetchUserData() {
    return async dispatch => {
        dispatch(fetchRequestUserData());

        let userData = await getUserInfo();

        dispatch(receivedRequestUserData(userData));

        return dispatch(addUserData(userData));
    };
}

/**
 * Запрос к серверу за данными о пользователе в случае если их нет в store.
 *
 * @returns {function(*, *)}
 */
function fetchUserDataIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetchUserData(getState())) {
            return dispatch(fetchUserData());
        }
    };
}


export {
    addUserData,
    fetchUserDataIfNeeded,
    fetchRequestUserData,
    fetchUserData,
    incrementCounter,
    decrementCounter
};