import React from 'react';
import {  Modal, Form, Input ,Dropdown, Menu, Col,Divider,Select} from 'antd';

const FormItem = Form.Item;
const InputGroup = Input.Group;
class CambioContrasenha extends React.Component{
    render(){
        const {visible,onCancel,onOk,form} = this.props;
        const {getFieldDecorator} = form;
        return(
            <Modal 
                    visible={visible}
                    title="Cambio de contraseña"
                    onCancel={onCancel}
                    cancelText="Cancelar"
                    okText="Restablecer constraseña"
                    onOk={onOk} 
                >
                <h2>Crea una nueva contraseña</h2>
                <h3>Introduce abajo una contraseña nueva.</h3>
                <h3>Tu nueva contraseña no debe ser igual a la anterior.</h3>
                <InputGroup size="large">
                    <Col span={12}> 
                    <FormItem label="Contraseña nueva">
                    {getFieldDecorator("nuevaContraseña", {
                    rules: [{ required: true, message: 'Porfavor ingrese la nueva contraseña ' }],
                    })(
                        <Input type="textarea"/>
                    )}
                    </FormItem>
                    </Col>
                </InputGroup>
                <InputGroup size="large">
                <Col span={12}> 
                    <FormItem label="Confirmar constraseña">
                    {getFieldDecorator("copiaContraseña", {
                    rules: [{ required: true, message: 'Porfavor ingrese de nuevo la contraseña ' }],
                    })(
                        <Input type="textarea"/>
                    )}
                    </FormItem>
                    </Col>
                </InputGroup>
                </Modal>
        )
    }
}

const WrappedForm = Form.create()(CambioContrasenha);

export default WrappedForm;