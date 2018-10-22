import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Roles from './Roles';
import Routes from './Routes';

class PrivateRoute extends Component{
    
    constructor(props){
        super(props); 
        this.isAuthenticated = false;

    }
    verifyAuthentication = () =>{
        try{
            let data = localStorage.getItem('u');
            if (data){
                let sessionInfo = JSON.parse(atob(data));
                if(sessionInfo){
                    if(Roles[sessionInfo.role]){
                        let path = Routes.find(e => e.path == this.props.path)
                        if(path){
                            if(path.access.includes(sessionInfo.role)){
                                return true;
                            }else{
                                return false;
                            }
                        }else{
                            return false;
                        }
                    }else{
                        return false;
                    }
                }
            }else{
                return false;
            }
        }catch(e){
            console.log(e);
            return false;
        }
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