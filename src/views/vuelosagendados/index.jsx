import React from "react";
import { Col, Layout, Button, Menu, Dropdown, Icon } from "antd";
import { TheContent, TheHeader } from "../../components/layout";
import AgendadosList from "./AgendadosList";
import API from '../../Services/Api';
import notify from "../../utils/notify";

export default class Oficinas extends React.Component {

  constructor(props) {
    super(props);
    this.listRef = React.createRef();
    this.uploadRef = React.createRef();
  }

  

  subir = () => this.uploadRef.current.open();

  fetch = () => this.listRef.current.fetch();

  eliminar = () =>{
    API.post(`vuelosagendados/eliminar`).then(response=>{
      notify.success({
        message:"Eliminación de vuelos agendados pasados"
      })
    })
  }

  render() {
    const menu = (
      <Menu>
        <Menu.Item onClick={this.eliminar}> Eliminar </Menu.Item>
      </Menu>
    );

    return (
      <Layout>
        <TheHeader>
          <Col span={12}>
            <h1> Vuelos Agendados </h1>
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
          <AgendadosList ref={this.listRef} updateAction={this.editar}/>
        </TheContent>
      </Layout>
    );
  }
}
