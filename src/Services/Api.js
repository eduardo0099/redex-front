import axios from 'axios';
import backend from './backend';

const API =  axios.create({
    baseURL: backend,
    crossDomain: true,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
    }
});

export default API;