import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

class PrivateRoute extends Component{
    
    constructor(props){
        super(props); 
        this.isAuthenticated = true;

    }
    verifyAuthentication = () =>{
        return this.isAuthenticated;
    }
    render(){
        const {component:Component, ...rest} = this.props;
        return(
           <Route {...rest} render={()=>(
                this.verifyAuthentication()
                ? <Component />
                : <Redirect to='/'/>
            )}/>
        );
    }
}

export default PrivateRoute;