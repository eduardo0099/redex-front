import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Roles from './../../utils/Roles';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;
class LoginForm extends Component{
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
                        localStorage.setItem('a',JSON.stringify(sessionInfo));
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
                localStorage.setItem('a',JSON.stringify(response));
                this.setState({hasAuth:true});
            }

        }catch(e){
            console.log(e);

        }
    }
    checkLogin = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
              console.log('Received values of form: ', values);
            }
        })
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        if(this.state.hasAuth === true){
            return(<Redirect to="/system"/>);
        }else{
            return(
                <div className="container-login-form">
                    <h3 className="title-login">Sistema de redex</h3>
                    <Form onSubmit={this.checkLogin} className="login-form">
                        <FormItem>
                            {getFieldDecorator('Usuario', {
                                rules: [{ required: true, message: 'Ingrese su usuario' }],
                            })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Usuario" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('Contraseña', {
                                rules: [{ required: true, message: 'Ingrese su contraseña' }],
                            })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Contraseña" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>Recuerdame</Checkbox>
                            )}
                            <a className="login-form-forgot" href="">Recuperar Contraseña</a>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Iniciar Sesión
                            </Button>
                        </FormItem>
                    </Form>
                    <button onClick={() => this.checkAuth(Roles.GERENTE)}>Iniciar como gerente</button>
                    <button onClick={() => this.checkAuth(Roles.ADMIN)}>Iniciar como admin</button>
                    <button onClick={() => this.checkAuth(Roles.JEFEOFICINA)}>Iniciar como jefe oficina</button>
                    <button onClick={() => this.checkAuth(Roles.EMPLEADO)}>Iniciar como empleado</button>
                </div>

            );
        }
    }
}
const Login = Form.create()(LoginForm);

export default Login;
