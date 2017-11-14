import Rest from '../rest';
import store from '../store';

/**
 * Метод получения id пользователя.
 *
 * @return {String}
 */
export function getUserId() {
    return 'id123456';
}

/**
 * Метод получения данных о пользователе.
 * В случае если данных нет в кэше - будет сделан запрос к серверу за данными.
 *
 * @param [options]
 * @return {Promise}
 */
export function getUserInfo(options) {
    if (store.getState().userData.firstName) {
        return Promise.resolve(store.getState().userData);
    }

    return new Rest().getUserInfo({
        userId: getUserId()
    }, options);
}