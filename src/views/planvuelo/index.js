import React from 'react';
import { Col, Layout, Button, Menu, Dropdown, Icon } from "antd";
import { TheContent, TheHeader } from '../../components/layout';
import CrimsonUpload from '../../components/CrimsonUpload';
import PlanVueloList from './PlanVueloList';
import PlanVueloForm from './PlanVueloForm';
import PlanVueloGenerarForm from './PlanVueloGenerarForm';

export default class PlanVuelo extends React.Component {

  constructor(props) {
    super(props);
    this.listRef = React.createRef();
    this.formRef =  React.createRef();
    this.uploadRef = React.createRef();
    this.generarRef = React.createRef();
  }

  nuevo = () => this.formRef.current.nuevo();

  editar = (id) => this.formRef.current.editar(id);

  subir = () => this.uploadRef.current.open();

  fetch = () => this.listRef.current.fetch();

  generar = () => this.generarRef.current.open();

  render() {
  
    const menu = (
      <Menu>
        <Menu.Item onClick={this.nuevo}> Nuevo vuelo </Menu.Item>
        <Menu.Item onClick={this.subir}> Cargar datos </Menu.Item>
        <Menu.Item onClick={this.generar}> Generar </Menu.Item>
      </Menu>
    );

    return (
      <Layout>
      <TheHeader>
        <Col span={12}>
          <h1> Plan de Vuelo </h1>
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
          <PlanVueloList ref={this.listRef} updateAction={this.editar}/>
          <PlanVueloForm ref={this.formRef} fetch={ this.fetch }/>
          <CrimsonUpload ref={this.uploadRef} fetch={this.fetch} url="/planvuelo/carga" title="Cargar vuelos"/>
          <PlanVueloGenerarForm ref={this.generarRef}/>
      </TheContent>
    </Layout>
    )
  }
}
