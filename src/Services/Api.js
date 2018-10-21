export default class Api{
    constructor(){
        this.url = "http://localhost:5000/"
    }
    
    login(cb){
        console.log(">>",this.url);
        cb();
    }
}