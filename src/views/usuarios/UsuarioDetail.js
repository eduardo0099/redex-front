import React, { Component } from 'react';
import {Modal,Form} from 'antd';

class InnerForm extends React.Component {

    render(){
        const {visible, close} = this.props;
        return(
            <Modal visible = {visible} onCancel={close}/>
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

    close = () => {
        this.setState({ ...this.state, visible: false });
      };

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