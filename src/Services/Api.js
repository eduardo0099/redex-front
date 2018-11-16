import axios from 'axios';
import backend from './backend';

const API =  axios.create({
    baseURL: backend,
    crossDomain: true,
    transformRequest: [function (data, headers) {
        headers['Authorization'] = localStorage.getItem('token');
        return JSON.stringify(data);
      }],
    headers: {
        'Content-Type': 'application/json',
    }
});

export default API;