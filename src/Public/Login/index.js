import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Roles from './../../Utils/Roles';
class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            hasAuth: false,
        }
    }
    checkAuth = (rol) => {
        try{
            let data = localStorage.getItem('u');
            if (data){
                let sessionInfo = JSON.parse(atob(data));
                if(sessionInfo){
                    //Lo deja pasar 
                    if(Roles[sessionInfo.role]){
                        sessionInfo.role = rol;
                        localStorage.setItem('u',btoa(JSON.stringify(sessionInfo)));
                        //localStorage.setItem('a',JSON.stringify(sessionInfo));
                        this.setState({hasAuth:true});
                    }else{
                        //error, no existe el rol

                    }
                }

            }else{
                //Manda servicio al backend para que lo loguee

                //El backend lo loguea y guarda la info en el localStorage
                let response = {
                    role: rol,
                    token: 'asdjhdshsadhjadkadsjjdska',
                }
                localStorage.setItem('u',btoa(JSON.stringify(response)));
                //localStorage.setItem('a',JSON.stringify(response));
                this.setState({hasAuth:true});
            }
            
        }catch(e){
            console.log(e);

        }
    }
    render(){
        if(this.state.hasAuth == true){
            return(<Redirect to="/system"/>);
        }
        return(
            <div>
                <h1>Pantalla de login</h1>
                <button onClick={()=>this.checkAuth(Roles.ADMIN)}>Loguearme como admin</button>
                <button onClick={()=>this.checkAuth(Roles.GERENTE)}>Loguearme como gerente</button>
                <button onClick={()=>this.checkAuth(Roles.EMPLEADO)}>Loguearme como empleado</button>
                <button onClick={()=>this.checkAuth(Roles.JEFEOFICINA)}>Loguearme como jefe de oficina</button>
            </div>
        );
    }
}

export default Login;