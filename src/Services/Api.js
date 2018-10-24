import axios from 'axios';

const API =  axios.create({
    //baseURL: 'http://localhost:5000/',
    baseURL: 'https://redex-backend.herokuapp.com/',
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