import React from 'react';
import { Col, Layout, Button ,Menu,Dropdown,Icon,Modal, Upload} from 'antd';
import { TheContent, TheHeader } from '../../components/layout';
import UsuarioList from './UsuarioList';
import UsuarioDetail from './UsuarioDetail';
import UsuarioForm from './UsuarioForm';
import CrimsonUpload from '../../components/CrimsonUpload';
import API from '../../Services/Api';
import notify from '../../utils/notify';

export default class Usuarios extends React.Component {
  constructor(props) {
    super(props);
    this.listRef = React.createRef();
    this.uploadRef = React.createRef();
    this.detailRef = React.createRef();
    this.nuevoRef = React.createRef();
    this.state = {
      modalVisible: false,
    }
  }
  nuevo = () => this.nuevoRef.current.nuevo();
  subir = () => this.uploadRef.current.open();

  fetch = () => {
    this.nuevoRef.current.fetch();
  }

  findDetalle = (id) => {
    this.detailRef.current.detail(id);
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  
  render() {
    const menu = (
      <Menu>
        <Menu.Item onClick={this.nuevo} key="1">Nuevo Usuario</Menu.Item>
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
            <UsuarioList ref = {this.listRef} onDetalle={this.findDetalle} />
            <UsuarioForm  ref = {this.nuevoRef} fetch={this.fetch} />
            <CrimsonUpload ref={this.uploadRef} url="/usuarios/carga" title="Cargar usuarios"/>
            <UsuarioDetail ref={this.detailRef}/>
          </TheContent>
        </Layout>
    )
  }
}
