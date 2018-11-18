import axios from 'axios';
import backend from './backend';
import fileDownload from 'js-file-download';
const API = axios.create({
    baseURL: backend,
    crossDomain: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

API.interceptors.request.use(function (config) {
    if (localStorage.getItem('token')) {
        config.headers.Authorization = localStorage.getItem('token');
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

function getFile(response) {
    fileDownload(response, response.headers["content-disposition"]);
}

export { getFile };
export default API;