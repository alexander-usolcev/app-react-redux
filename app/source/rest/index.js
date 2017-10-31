import { API_HOST, API_NAMESPACE } from '../const/environment';
import Loader from '../helpers/loader';


function checkStatus(response, url, options) {
    // баг в старых браузерах. Отсутствует xhr.responseURL, а также из-за CORS нельзя получить заголовки. Добавляем руками.
    if (!response.url || response.url === '') {
        response.url = url;
    }

    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        return new Error(`Status is ${response.status}`);
    }
}

class Rest {
    static getBaseHeaders() {
        return {
            'Content-Type': 'application/json',
        };
    }

    /**
     * Базовый метод запроса fetch.
     *
     * @param url
     * @param options
     * @returns {Promise.<*|{type, alias, describe}>}
     */
    async fetch(url, options = {}) {
        this.url = url;
        this.options = options;

        if (!options.silent) {
            Loader.show();
        }

        options = Object.assign({
            headers: Rest.getBaseHeaders()
        }, options);

        let response = await fetch(url, options);
        response = await checkStatus(response, url, options);

        Loader.hide();

        return response.json();
    }

    /**
     * Запрос на получение данных о пользователе.
     *
     * @param {userId}
     * @param [options]
     * @return {Promise.<Object>}
     */
    getUserInfo({userId}, options) {
        let url = `${API_HOST}/${API_NAMESPACE}/getUserInfo/${userId}`;

        // options = Object.assign({
        //     method: 'POST',
        //     body: getFormData(data)
        // }, options);

        return this.fetch(url, options);
    }
}

export default Rest;