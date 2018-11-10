import React, { Component } from 'react';
import {Modal,Form} from 'antd';

class InnerForm extends React.Component {

    render(){
        const {visible} = this.props;
        return(
            <Modal visible = {visible}/>
        )
    }
}





const  WrappedForm = Form.create()(InnerForm);

export default class UsuarioDetail extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            visible: false,
        }
        this.detailRef = React.createRef();
    }

    saveFormRef = (detailRef) => {
        this.detailRef = detailRef;
    }

    detail = id =>{
        console.log("Info del usuario",id);
        this.setState({
            visible:true
        })
    }

    render(){
        return(
            <WrappedForm
                wrappedComponentRef={this.saveFormRef}
                visible={this.state.visible}
                close={this.close}
                title={this.state.title}
                action={this.state.action}
                paquete={this.state.paquete}
            />

        )
    }
}