import React from "react";
import { Table, Tag, Dropdown, Menu, Icon, message } from "antd";
import API, { getFile } from "../../Services/Api";
import CrimsonTable from "../../components/CrimsonTable";
import  notify  from "../../utils/notify";

const { Column } = Table;

export default class OficinasList extends React.Component {
  constructor(props) {
    super(props);
    this.listRef = React.createRef();
  }

  fetch = () => {
    this.listRef.current.fetch();
  };

  reporte = id => {
    const hide = message.loading('Procesando...', 0);
    let aux = { idVueloAgendado: id };
    API.get(`reportes/paquetesXvuelo`, {
      params: aux,
      responseType: "arraybuffer"
    }).then(response => {
      getFile(response);
      hide();
      notify.success({
        message: "Reporte generado",
      });
    }).catch(error => {
      hide();
      notify.error({
        message: "No se pudo emitir el reporte"
      });
    });
  };

  render() {
    const { updateAction } = this.props;
    return (
      <CrimsonTable url="/vuelosagendados" ref={this.listRef} pageSize={6}>
        <Column
          title="Origen"
          key="origen"
          width="25%"
          render={record => (
            <div>
              <span> {record.fechaInicioString} </span>
              <div>
                <b> {record.vuelo.oficinaOrigen.pais.nombre} </b>
              </div>
              <small> {record.vuelo.oficinaOrigen.codigo} </small>
            </div>
          )}
        />
        <Column
          title="Destino"
          key="destino"
          width="25%"
          render={record => (
            <div>
              <span> {record.fechaFinString} </span>
              <div>
                <b> {record.vuelo.oficinaDestino.pais.nombre} </b>
              </div>
              <small> {record.vuelo.oficinaDestino.codigo} </small>
            </div>
          )}
        />
        <Column
          title="Capacidad"
          key="capacidad"
          align="center"
          width="30%"
          render={record => (
            <span>
              {record.capacidadActual}/{record.capacidadMaxima}
            </span>
          )}
        />
        <Column
          title="Estado"
          dataIndex="estado"
          key="estado"
          width="20%"
          align="center"
          render={estado => {
            switch (estado.name) {
              case "CREADO":
                return <Tag color="geekblue"> Creado </Tag>;
              case "FINALIZADO":
                return <Tag color="red"> Finalizado </Tag>;
              case "ACTIVO":
                return <Tag color="green"> Activo </Tag>;
              default:
                return null;
            }
          }}
        />
        <Column
          width="50px"
          title=""
          key="action"
          render={record => {
            const menu = (
              <Menu>
                <Menu.Item>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={this.reporte.bind(this, record.id)}
                  >
                    Paquetes
                  </a>
                </Menu.Item>
              </Menu>
            );
            return (
              <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" href="#">
                  <Icon type="setting" theme="outlined" />
                </a>
              </Dropdown>
            );
          }}
        />
      </CrimsonTable>
    );
  }
}
