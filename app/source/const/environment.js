let API_HOST = 'http://some-domain.com:5000';
const API_NAMESPACE = 'api';

if (DEBUG) {
    API_HOST = 'http://localhost:5000';
}

export { API_HOST, API_NAMESPACE };
