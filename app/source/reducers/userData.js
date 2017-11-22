import { ADD_USER_DATA, FETCH_USER_DATA, RECEIVED_USER_DATA } from '../const/actions';
import Lang from '../lang';

let initialUserData = {
	isFetching: false,
	firstName: null,
	lastName: null,
	gitProfile: null,
	id: null
};

/**
 * Метод установки локализации.
 */
function setLocale(userData) {
	let locale = 'en';

	if (userData.locale === 'ru') {
		locale = 'ru';
	}

	Lang.setLocale(locale);

	return locale;
}

const userData = (state = initialUserData, action) => {
	switch (action.type) {
		case ADD_USER_DATA:
			let userData = {
				...state,
				...action.userData
			};

			// Устанавливаем локаль пользователя.
			userData.locale = setLocale(userData);

			return userData;
		case FETCH_USER_DATA:
			return {
				...state,
				isFetching: true
			};
		case RECEIVED_USER_DATA:
			return {
				...state,
				isFetching: false
			};
		default:
			return state;
	}
};

export default userData;