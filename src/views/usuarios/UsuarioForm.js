import React from 'react';
import { AutoComplete, Button, Modal, Form, Input,InputNumber, Radio ,Dropdown, Menu,Divider, Col} from 'antd';

const FormItem = Form.Item;
const InputGroup = Input.Group;

const menu = (
  <Menu >
    <Menu.Item key="1">Oficina 1</Menu.Item>
    <Menu.Item key="2">Oficina 2</Menu.Item>
    <Menu.Item key="3">Oficina 3</Menu.Item>
  </Menu>
);

const menuDocumento = (
  <Menu >
    <Menu.Item key="1">DNI</Menu.Item>
    <Menu.Item key="2">Pasaporte</Menu.Item>
    <Menu.Item key="3">Oficina 3</Menu.Item>
  </Menu>
);

const menuRol = (
  <Menu >
    <Menu.Item key="1">Trabajador</Menu.Item>
    <Menu.Item key="2">Jefe de Oficina</Menu.Item>
    <Menu.Item key="3">Gerente General</Menu.Item>
  </Menu>
);

function onSelect(value) {
  console.log('onSelect', value);
}

class UsuarioForm extends React.Component {

    state = {
      dataSource: [],
    } 

    handleSearch = (value) => {
      this.setState({
        dataSource: !value ? [] : [
          value,
          value + value,
          value + value + value,
        ],
      });
    }

    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      const { dataSource } = this.state;

      return (
        <Modal
        style={{ top: 20 }}
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
                rules: [{ required: true, message: 'Porfavor ingrese el nombre del usuario' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="Apellido Paterno">
              {getFieldDecorator('aPaterno', {
                rules: [{ required: true, message: 'Porfavor ingrese el apellido paterno ' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="Apellido Materno">
              {getFieldDecorator('aMaterno', {
                rules: [{ required: true, message: 'Porfavor ingrese el apellido materno' }],
              })(
                <Input />
              )}
            </FormItem>
            <InputGroup size="large">
            <Col span={12}>
            <FormItem label="Tipo de documento">
              {getFieldDecorator('tipDoc', {
                initialValue:'Seleccionar',
                rules: [{ required: true, message: 'Porfavor seleccione el tipo de documento' }],
              })(
                <Dropdown.Button  overlay={menuDocumento}>
                  Seleccionar
                </Dropdown.Button>
              )}
            </FormItem>
            </Col>
            <Col span = {12}>
            <FormItem label="Documento de Identidad">
              {getFieldDecorator('docId', {
                rules: [{ required: true, message: 'Porfavor ingrese el documento de identidad' }],
              })(
                <Input value ={Number}/>
              )}
            </FormItem>
            </Col>
            <Col span={12}>
            <FormItem label="Email">
              {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Porfavor ingrese el email' }],
              })(
                <Input />
              )}
            </FormItem>
            </Col>
            <Col span={12}>
            <FormItem label="Telefono">
              {getFieldDecorator('telefono', {
                rules: [{ required: true, message: 'Porfavor ingrese el telefono' }],
              })(
                <Input value={Number}/>
              )}
            </FormItem>
            </Col>
            <Col span={8}>
            <FormItem label="Pais">
              <AutoComplete
                dataSource={dataSource}
                style={{ width: 200 }}
                onSelect={onSelect}
                onSearch={this.handleSearch}
                placeholder="input here"
              />
            </FormItem>
            </Col>
            <Col span={8}>
            <FormItem label="Oficina">
              {getFieldDecorator('oficina', {
                initialValue:'Seleccionar',
              })(
                <Dropdown.Button  overlay={menu}>
                  Seleccionar
                </Dropdown.Button>
              )}
            </FormItem>
            </Col>
            <Col span={8}>
            <FormItem label="Rol">
              {getFieldDecorator('rol', {
                initialValue:'Seleccionar',
              })(
                <Dropdown.Button  overlay={menuRol}>
                  Seleccionar
                </Dropdown.Button>
              )}
            </FormItem>
            </Col>
            </InputGroup>
          </Form>
        </Modal>

      )
    }
}

const WrappedForm = Form.create()(UsuarioForm);

export default WrappedForm;