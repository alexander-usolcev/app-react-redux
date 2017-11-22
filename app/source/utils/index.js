export function isDev() {
	return process.env.NODE_ENV !== 'production';
}

export function getFormData(object) {
	const formData = new FormData();

	Object
		.keys(object)
		.forEach(key => formData.append(key, object[key]));

	return formData;
}

export function camelCased(string) {
	return string.replace(/_([a-z])/g, g => g[1].toUpperCase());
}

export function snakeCased(string) {
	return string.replace(/[A-Z]/g, g => `_${g.toLowerCase()}`);
}

export function toCamelCase(object) {
	return Object
		.keys(object)
		.reduce((obj, key) => {
			obj[camelCased(key)] = object[key];

			return obj;
		}, {});
}

export function toSnakeCase(object) {
	return Object
		.keys(object)
		.reduce((obj, key) => {
			obj[snakeCased(key)] = object[key];

			return obj;
		}, {});
}