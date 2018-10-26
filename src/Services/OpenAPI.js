import axios from 'axios';
import backend from './backend';

const OpenAPI =  axios.create({
    baseURL: backend,
    timeout: 10000,
    crossDomain: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default OpenAPI;