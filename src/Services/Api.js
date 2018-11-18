import axios from 'axios';
import backend from './backend';
import fileDownload from 'js-file-download';
const API =  axios.create({
    baseURL: backend,
    crossDomain: true,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
    }
});

API.interceptors.request.use(function (config) {
    config.headers.Authorization = localStorage.getItem('token');
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

function getFile(response){
    fileDownload(response, response.headers["content-disposition"]);
}

export { getFile };
export default API;