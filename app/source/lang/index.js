'use strict';

import * as RU from './ru';
import * as EN from './en';

class Lang {
    constructor() {
        this.locale = 'en';
    }

    setLocale(locale) {
        this.locale = locale;
    }

    get() {
        if (this.locale === 'ru') {
            return RU;
        }

        return EN;
    }
}

export default new Lang();

