import React from 'react';
import { Col, Row, Layout, Button, Menu, Dropdown, Icon, Modal, Upload,Input} from 'antd';
import { TheContent, TheHeader } from '../../components/layout';
import PaquetesList from './PaquetesList';
import PaquetesDetail from './PaquetesDetail';
import CrimsonUpload from '../../components/CrimsonUpload';

const Search = Input.Search;

export default class Paquetes extends React.Component {

  constructor(props) {
    super(props);
    this.listRef = React.createRef();
    this.detailRef = React.createRef();
    this.uploadRef = React.createRef();
  }
  
  upload = () => this.uploadRef.current.open();

  gotoNuevo = () => {
    this.props.route.history.push('/paquetes/nuevo');
  }

  findDetalle = (id) => {
    this.detailRef.current.detail(id);
  }

  render() {
    const menu = (
      <Menu>
        <Menu.Item onClick={this.gotoNuevo} key="1">Nuevo Paquete</Menu.Item>
        <Menu.Item onClick={this.upload} key="2">Cargar datos</Menu.Item>
      </Menu>
    );

    const docI = (
            <Menu >
              <Menu.Item key="1"><Icon type="user" />DNI</Menu.Item>
              <Menu.Item key="2"><Icon type="user" />Pasaporte</Menu.Item>
            </Menu>
    );

    return (
        <Layout>
          <TheHeader>
            <Col span={12}>
              <h1> Paquetes </h1>
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
            <Row>
              <Col span={5}>
                <Dropdown.Button   overlay={docI}>
                  Tipo de Documento
                </Dropdown.Button>
                </Col>
              <Col span={6}>
                <Search
                  placeholder="Ingresar documento del cliente"
                  onSearch={value => console.log(value)}
                  enterButton
                />
              </Col>
            </Row>
            <PaquetesList ref={ this.listRef } onDetalle = { this.findDetalle } />
            <CrimsonUpload ref={ this.uploadRef } url="/paquetes/carga" title="Cargar paquetes"/>
            <PaquetesDetail ref= { this.detailRef }/>
          </TheContent>
        </Layout>
    )
  }
}

