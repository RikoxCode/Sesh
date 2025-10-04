import axios from 'axios';
globalThis.axios = axios;

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
