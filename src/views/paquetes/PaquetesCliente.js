import React from 'react';
import {  Modal, Form, Input ,Dropdown, Menu, Col,Divider,Select} from 'antd';
import API from '../../Services/Api';

const FormItem = Form.Item;
const Option = Select.Option;

class PaquetesCliente extends React.Component {
    constructor(props){
        super(props);
        this.state=({
            tipoDoc:[]
        })
    }
    
    componentDidMount(){
        API.get('/tipodocidentidad').then(response=>{
            this.setState({...this.state,
              tipoDoc:response.data
            })
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
                {getFieldDecorator("idDocumento", {
                rules: [{ required: true, message: 'Porfavor ingrese el tipo de documento' }],
                })(
                <Select  style={{width:"100%"}}>
                    {this.state.tipoDoc.map(i=>(
                        <Option key={i.id} value={i.id}>
                        {i.simbolo}
                        </Option>
                    ))}
                </Select>
                )}
                </FormItem>
                <FormItem label="">
                {getFieldDecorator("docIdentidad", {
                rules: [{ required: true, message: 'Porfavor ingrese el documento de identidad' }],
                })(
                    <Input type="textarea"/>
                )}
                </FormItem>
                <FormItem label="Nombres">
                {getFieldDecorator("nombres", {
                rules: [{ required: true, message: 'Porfavor ingrese el nombre ' }],
                })(
                    <Input type="textarea"/>
                )}
                </FormItem>
                <FormItem label="Apellido Paterno">
                {getFieldDecorator("apPaterno", {
                rules: [{ required: true, message: 'Porfavor ingrese el apellido paterno' }],
                })(
                    <Input type="textarea"/>
                )}
                </FormItem>
                <FormItem label="Apellido Materno">
                {getFieldDecorator("apMaterno")(<Input type="textarea" />)}
                </FormItem>
                <Divider orientation="left">Contacto</Divider>
                    <FormItem label="Correo Electronico">
                    {getFieldDecorator("correoElectronico", {
                    rules: [{ required: true, message: 'Porfavor ingrese el correo electronico' }],
                    })(
                        <Input type="textarea"/>
                    )}
                    </FormItem>
                    <FormItem label="Telefono">
                    {getFieldDecorator("telefono", {
                    rules: [{ required: true, message: 'Porfavor ingrese el telefono' }],
                    })(
                        <Input type="textarea"/>
                    )}
                    </FormItem>
                    <FormItem label="Direccion">
                    {getFieldDecorator("direccion", {
                    rules: [{ required: true, message: 'Porfavor ingrese la direccion' }],
                    })(
                        <Input type="textarea"/>
                    )}
                    </FormItem>
            </Form>
            </Modal>
        )
    }
}

const WrappedForm = Form.create()(PaquetesCliente);

export default WrappedForm;