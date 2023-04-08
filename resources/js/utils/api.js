import axios from 'axios';
import moment from 'moment';

const api = axios.create({
    baseURL: `${location.origin}/api/`,
    timeout: 120000
});

api.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('token');

    if (token) config.headers.Authorization = `Bearer ${token}`;

    config.headers.timezone = moment().format('Z');
    config.headers.hour = config.headers.timezone[0] + config.headers.timezone[2];

    return config;
});

api.interceptors.response.use(async (response) => {
    return response;
}, async (e) => {

    const { data, config } = e.response;

    // if (data.message == 'Você não pode acessar essa área.') location.href = '/';

    if (data.message === 'Seu token foi expirado.') {

        try {

            const { data: { access_token } } = await api.post('refresh', {});

            localStorage.setItem('token', access_token);
            config.headers['Authorization'] = `Bearer ${access_token}`;

            return api.request(config);

        } catch (e) {

            return Promise.reject(e);

        }

    } else if (data.message === 'Seu token não está autorizado.') {

        e.response.data.message = 'Sua sessão expirou faça login novamente.';

        setTimeout(() => {

            localStorage.removeItem('token');
            localStorage.removeItem('user');

            window.location.href = '/';

        }, 2000);
    }

    return Promise.reject(e);

});

export default api;