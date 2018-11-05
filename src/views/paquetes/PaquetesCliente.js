import React from 'react';
import {  Modal, Form, Input ,Dropdown, Menu, Col,Divider} from 'antd';

const FormItem = Form.Item;

class PaquetesCliente extends React.Component {
    constructor(props){
        super(props);
        this.state=({
            docIdent:"",
            nombre:"",
            apPaterno:"",
            apMaterno:"",
            correo:"",
            telefono:""
        })
        this.handleDocI = this.handleDocI.bind(this);
        this.handleNombre = this.handleNombre.bind(this);
        this.handleApPaterno = this.handleApPaterno.bind(this);
        this.handelApMaterno = this.handelApMaterno.bind(this);
        this.handleCorreo = this.handleCorreo.bind(this);
        this.handleTelefono = this.handleTelefono.bind(this);
    }
    
    handleTelefono(e){
        this.setState({
            telefono: e.target.value
        })
    }

    handleCorreo(e){
        this.setState({
            correo: e.target.value
        })
    }

    handleDocI(e){
        this.setState({
            docIdent:e.target.value
        });
    }

    handleNombre(e){
        this.setState({
            nombre:e.target.value
        })
    }

    handleApPaterno(e){
        this.setState({
            apPaterno:e.target.value
        })
    }

    handelApMaterno(e){
        this.setState({
            apMaterno:e.target.value
        })
    }

    render(){
        const { visible, onCancel, onOk, form } = this.props;
        const { getFieldDecorator } = form;
        const docI = (
            <Menu >
              <Menu.Item key="1">DNI</Menu.Item>
              <Menu.Item key="2">Pasaporte</Menu.Item>
            </Menu>
        );
        return(
            <Modal
            visible={visible}
            title="Registro de Cliente Nuevo"
            okText="Registrar"
            cancelText="Cancelar"
            onCancel={onCancel}
            onOk={onOk}
            >
            <Form layout="vertical">
                <Divider orientation="left">Informacion General</Divider>
                <FormItem label="Doc. Identidad" >
                <Col span={12}>
                <Dropdown.Button   overlay={docI}>
                  Tipo de Documento
                </Dropdown.Button>
                </Col>
                <Col span={12}>
                {getFieldDecorator('docIdentidad', {
                rules: [{ required: true, message: 'Porfavor ingrese el documento de identidad' }],
                })(
                    <Input value={this.state.docIdent} onChange={this.handleDocI}></Input>
                )}
                </Col>
                </FormItem>
                <FormItem label="Nombres">
                {getFieldDecorator('nombres', {
                rules: [{ required: true, message: 'Porfavor ingrese el nombre ' }],
                })(
                    <Input value={this.state.nombre} onChange={this.handleNombre}></Input>
                )}
                </FormItem>
                <FormItem label="Apellido Paterno">
                {getFieldDecorator('apPaterno', {
                rules: [{ required: true, message: 'Porfavor ingrese el apellido paterno' }],
                })(
                    <Input value={this.state.apPaterno} onChange={this.handleApPaterno}></Input>
                )}
                </FormItem>
                <FormItem label="Apellido Materno">
                    <Input value={this.state.apMaterno} onChange={this.handelApMaterno}></Input>
                </FormItem>
                <Divider orientation="left">Contacto</Divider>
                <FormItem label="Correo Electronico">
                {getFieldDecorator('correoElectronico', {
                rules: [{ required: true, message: 'Porfavor ingrese el correo electronico' }],
                })(
                    <Input  value={this.state.correo}  onChange={this.handleCorreo}></Input>
                )}
                </FormItem>
                <FormItem label="Telefono">
                {getFieldDecorator('telefono', {
                rules: [{ required: true, message: 'Porfavor ingrese el telefono' }],
                })(
                    <Input value={this.state.telefono} onChange={this.handleTelefono}></Input>
                )}
                </FormItem>
            </Form>
            </Modal>
        )
    }
}

const WrappedForm = Form.create()(PaquetesCliente);

export default WrappedForm;