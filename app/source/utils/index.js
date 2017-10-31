export function ordinalNumbers(number, suffixes) {
    if (number > 3 && number < 21) return suffixes[3]; // 'th';

    switch (number % 10) {
        case 1:
            return suffixes[0]; // 'st';
        case 2:
            return suffixes[1]; // 'nd';
        case 3:
            return suffixes[2]; // 'rd';
        default:
            return suffixes[3]; // 'th';
    }
}

export function setImageToCache(src) {
    let image = document.createElement('img');
    image.src = src;
    image.style.position = 'absolute';
    image.style.top = '-10000px';
    image.style.left = '-10000px';

    document.body.appendChild(image);

    image.parentNode.removeChild(image);
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