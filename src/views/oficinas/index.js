import React from "react";
import { Col, Layout, Button, Menu, Dropdown, Icon } from "antd";
import { TheContent, TheHeader } from "../../components/layout";
import OficinasList from "./OficinasList";
import OficinasForm from "./OficinasForm";
import CrimsonUpload from '../../components/CrimsonUpload';

export default class Oficinas extends React.Component {

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
        <Menu.Item onClick={this.nuevo}> Nueva  oficina </Menu.Item>
        <Menu.Item onClick={this.subir}> Cargar datos </Menu.Item>
      </Menu>
    );

    return (
      <Layout>
        <TheHeader>
          <Col span={12}>
            <h1> Oficinas </h1>
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
          <OficinasList ref={this.listRef} updateAction={this.editar}/>
          <OficinasForm ref={this.formRef}/>
          <CrimsonUpload ref={this.uploadRef} url="/oficinas/carga" title="Cargar oficinas"/>
        </TheContent>
      </Layout>
    );
  }
}
