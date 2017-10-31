import React, { PureComponent } from 'react';

import { addUserSettingsData, setUserSettingsData } from '../actions';
import { toSnakeCase } from '../utils';

class SettingsHelper extends PureComponent {
    constructor() {
        super();

        this.saveSettings = this.saveSettings.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    /**
     * Сохранить настройки пользователя.
     *
     * @return {Promise.<void>}
     */
    async saveSettings(settings) {
        const { dispatch } = this.props;

        let formData = toSnakeCase(settings);

        await dispatch(setUserSettingsData(formData));
    }
}

export default SettingsHelper;