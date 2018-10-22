import React from 'react';
import { Button, Modal, Form, Input,InputNumber, Radio ,Dropdown, Menu,Divider} from 'antd';

const FormItem = Form.Item;

const menu = (
  <Menu >
    <Menu.Item key="1">Oficina 1</Menu.Item>
    <Menu.Item key="2">Oficina 2</Menu.Item>
    <Menu.Item key="3">Oficina 3</Menu.Item>
  </Menu>
);

class UsuarioForm extends React.Component {

    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;

      return (
        <Modal
        visible={visible}
        width = {800}
        title="Crear nuevo usuario"
        okText="Create"
        onCancel={onCancel}
        onCreate={onCreate}
        >
          <Form layout="vertical">
            <FormItem label="Nombres">
              {getFieldDecorator('nombres', {
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="Apellidos">
              {getFieldDecorator('apellidos', {
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="Documento de Identidad">
              {getFieldDecorator('docId', {
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              })(
                <InputNumber value ={Number}/>
              )}
            </FormItem>
            <FormItem label="Email">
              {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="Telefono">
              {getFieldDecorator('telefono', {
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              })(
                <InputNumber value={Number}/>
              )}
            </FormItem>
            <FormItem label="Oficina">
              {getFieldDecorator('oficina', {
                initialValue:'Seleccionar',
              })(
                <Dropdown.Button  overlay={menu}>
                  Seleccionar
                </Dropdown.Button>
              )}
            </FormItem>
          </Form>
        </Modal>

      )
    }
}

const WrappedForm = Form.create()(UsuarioForm);

export default WrappedForm;