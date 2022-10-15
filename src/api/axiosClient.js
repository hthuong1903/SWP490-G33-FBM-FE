// api/axiosClient.js
import axios from 'axios';
import queryString from 'query-string';
// Set up default config for http requests here

// Please have a look at here `https://github.com/axios/axios#request-config` for the full list of configs
const axiosClient = axios.create({
    baseURL: 'http://20.205.46.182:8081/api',
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: (params) => queryString.stringify(params),
    body: (params) => JSON.stringify(params),
});
axiosClient.interceptors.request.use(async (config) => {
    // const accessToken = localStorage.getItem('accessToken');
    // if (accessToken) {
    //     config.headers.Authorization = `Bearer ${accessToken}`;
    // }

    return config;
});
axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
        }
        if (response && response.data) {
            return response.data;
        }

        return response;
    },

    (error) => {
        // Handle errors
        if (error.response.status === 403) {
            // redirect to 403 page
            // window.location = '/forbidden';
            // <Navigate to="/403" />;
        }
        // throw error;
    },
);
export default axiosClient;