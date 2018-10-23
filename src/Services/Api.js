import axios from 'axios';

const API =  axios.create({
    baseURL: 'http://10.101.57.118:5000/',
    timeout: 10000,
    crossDomain: true,
    headers: {
        'Content-Type': 'application/json'
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