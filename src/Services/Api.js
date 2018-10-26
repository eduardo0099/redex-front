import axios from 'axios';
import backend from './backend';


const API =  axios.create({
    baseURL: backend,
    timeout: 10000,
    crossDomain: true,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }
});

export default API;

 /* 
export default class Api {
    constructor(){
        this.url = "http://localhost:5000/"
    }
    
    login(cb){
        console.log(">>",this.url);
        cb();
    }
}*/