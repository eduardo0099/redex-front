import React from 'react';
import {  Modal, Form, Input ,Dropdown, Menu, Col,Divider} from 'antd';

const FormItem = Form.Item;

class PaquetesCliente extends React.Component {
    constructor(props){
        super(props);
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
                    <Input />
                )}
                </Col>
                </FormItem>
                <FormItem label="Nombres">
                {getFieldDecorator('nombres', {
                rules: [{ required: true, message: 'Porfavor ingrese el nombre ' }],
                })(
                    <Input />
                )}
                </FormItem>
                <FormItem label="Apellido Paterno">
                {getFieldDecorator('apPaterno', {
                rules: [{ required: true, message: 'Porfavor ingrese el apellido paterno' }],
                })(
                    <Input />
                )}
                </FormItem>
                <FormItem label="Apellido Materno">
                {getFieldDecorator('apMaterno', {
                rules: [{ required: true, message: 'Porfavor ingrese el apellido materno' }],
                })(
                    <Input />
                )}
                </FormItem>
                <Divider orientation="left">Contacto</Divider>
                <FormItem label="Correo Electronico">
                {getFieldDecorator('correoElectronico', {
                rules: [{ required: true, message: 'Porfavor ingrese el correo electronico' }],
                })(
                    <Input />
                )}
                </FormItem>
                <FormItem label="Telefono">
                {getFieldDecorator('telefono', {
                rules: [{ required: true, message: 'Porfavor ingrese el telefono' }],
                })(
                    <Input />
                )}
                </FormItem>
            </Form>
            </Modal>
        )
    }
}

const WrappedForm = Form.create()(PaquetesCliente);

export default WrappedForm;