import React from "react";
import {
  Col,
  Row,
  Layout,
  Button,
  Menu,
  Dropdown,
  Icon,
  Modal,
  Upload,
  Input,
  Select,
  Form
} from "antd";
import { TheContent, TheHeader } from "../../components/layout";
import PaquetesList from "./PaquetesList";
import PaquetesDetail from "./PaquetesDetail";
import CrimsonUpload from "../../components/CrimsonUpload";
import API, {getFile} from "../../Services/Api";

const Search = Input.Search;
const Option = Select.Option;
const FormItem = Form.Item;

export default class Paquetes extends React.Component {
  constructor(props) {
    super(props);
    this.listRef = React.createRef();
    this.detailRef = React.createRef();
    this.uploadRef = React.createRef();
    this.state = {
      listaDoc: [],
      visible: false
    };
    this.mostrarModal = this.mostrarModal.bind(this);
  }

  upload = () => this.uploadRef.current.open();

  gotoNuevo = () => {
    this.props.route.history.push("/paquetes/nuevo");
  };

  findDetalle = id => {
    this.detailRef.current.detail(id);
  };

  componentDidMount() {
    API.get("/tipodocidentidad").then(response => {
      this.setState({ ...this.state, listaDoc: response.data });
    });
  }

  emitirReporte = () => {
    let obj = { fecha_ini: "16-11-2018", fecha_fin: "18-11-2018" };
    API.post(`reportes/enviosXfechas`, obj).then(response => {
      getFile(response);
      this.setState({
        visible: false
      });
    });
  };

  mostrarModal = () => {
    this.setState({
      visible: true
    });
  };

  closeModal = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const menu = (
      <Menu>
        <Menu.Item onClick={this.gotoNuevo} key="1">
          Nuevo Paquete
        </Menu.Item>
        <Menu.Item onClick={this.upload} key="2">
          Cargar datos
        </Menu.Item>
        <Menu.Item onClick={this.mostrarModal} key="2">
          Emitir Reporte
        </Menu.Item>
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
          <PaquetesList ref={this.listRef} onDetalle={this.findDetalle} />
          <CrimsonUpload
            ref={this.uploadRef}
            url="/paquetes/carga"
            title="Cargar paquetes"
          />
          <PaquetesDetail ref={this.detailRef} />
          <Modal
            visible={this.state.visible}
            onOk={this.emitirReporte}
            onCancel={this.closeModal}
          />
        </TheContent>
      </Layout>
    );
  }
}
