import React from 'react';
import { Col, Layout, Button ,Menu,Dropdown,Icon,Modal, Upload} from 'antd';
import { TheContent, TheHeader } from '../../components/layout';
import UsuarioList from './UsuarioList';
import UsuarioForm from './UsuarioForm';
import CrimsonUpload from '../../components/CrimsonUpload';
import API from '../../Services/Api';
import notify from '../../utils/notify';

export default class Usuarios extends React.Component {
  constructor(props) {
    super(props);
    this.listRef = React.createRef();
    this.formRef =  React.createRef();
    this.uploadRef = React.createRef();
    this.state = {
      modalVisible: false,
    }
  }

  nuevo = () => this.formRef.current.nuevo();

  editar = (id) => this.formRef.current.editar(id);

  subir = () => this.uploadRef.current.open();

  fetch = () => this.listRef.current.fetch();

  showModal = () => {
    this.setState({ modalVisible: true });
  }

  handleCancel = () => {
    this.setState({ modalVisible: false });
  }

  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      form.resetFields();
      this.setState({ modalVisible: false });
    }); 
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  render() {
    const menu = (
      <Menu>
        <Menu.Item onClick={this.showModal} key="1">Nuevo Usuario</Menu.Item>
        <Menu.Item onClick={this.subir} key="2">Cargar datos</Menu.Item>
      </Menu>
    );

    return (
      <Layout>
          <TheHeader>
            <Col span={12}>
              <h1> Usuarios </h1>
            </Col>
            <Col span={12} align="right">
            <Dropdown overlay={menu}>
              <Button type="primary">
                Acciones <Icon type="down" />
              </Button>
            </Dropdown>
            </Col>
          </TheHeader>
          <TheContent>
            <UsuarioList/>
            <CrimsonUpload ref={this.uploadRef} url="/usuarios/carga" title="Cargar usuarios"/>
          </TheContent>
        </Layout>
    )
  }
}
