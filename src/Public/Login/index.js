import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            hasAuth: false,
        }
    }
    checkAuth = () => {
        this.setState({hasAuth:true});
    }
    render(){
        if(this.state.hasAuth == true){
            return(<Redirect to="/system"/>);
        }
        return(
            <div>
                <h1>Pantalla de login</h1>
                <button onClick={this.checkAuth}>Loguearme</button>
            </div>
        );
    }
}

export default Login;