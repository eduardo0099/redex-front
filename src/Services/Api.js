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

function getFile(response){
    fileDownload(response, response.headers["content-disposition"]);
}
export { getFile };
export default API;