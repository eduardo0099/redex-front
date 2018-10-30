import React from "react";
import { Col, Layout, Button, Menu, Dropdown, Icon } from "antd";
import { TheContent, TheHeader } from "../../components/layout";
import PaisesList from "./PaisesList";
import PaisesForm from "./PaisesForm";
import CrimsonUpload from '../../components/CrimsonUpload';

export default class Piases extends React.Component {

  constructor(props) {
    super(props);
    this.listRef = React.createRef();
    this.formRef =  React.createRef();
    this.uploadRef = React.createRef();
  }

  nuevo = () => this.formRef.current.nuevo();

  editar = (id) => this.formRef.current.editar(id);

  subir = () => this.uploadRef.current.open();

  fetch = () => this.listRef.current.fetch();

  render() {
    const menu = (
      <Menu>
        <Menu.Item onClick={this.nuevo}> Nuevo país </Menu.Item>
        <Menu.Item onClick={this.subir}> Cargar datos </Menu.Item>
      </Menu>
    );

    return (
      <Layout>
        <TheHeader>
          <Col span={12}>
            <h1> Países </h1>
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
          <PaisesList ref={this.listRef} updateAction={this.editar}/>
          <PaisesForm ref={this.formRef} fetch={this.fetch}/>
          <CrimsonUpload ref={this.uploadRef} url="/paises/carga" title="Cargar paises"/>
        </TheContent>
      </Layout>
    );
  }
}
