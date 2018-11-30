import React from "react";
import { Table, Tag, Dropdown, Menu, Icon } from "antd";
import API from "../../Services/Api";
import CrimsonTable from "../../components/CrimsonTable";

const { Column } = Table;

export default class PaquetesList extends React.Component {
  constructor(props) {
    super(props);
    this.listRef = React.createRef();
  }

  fetch = () => {
    this.listRef.current.fetch();
  };
  render() {
    const { onDetalle } = this.props;

    return (
      <div>
        <CrimsonTable url="/paquetes" ref={this.listRef}>
          <Column
            title="Cliente"
            key="cliente"
            width="16%"
            render={record => (
              <div>
                <span> {record.personaOrigen.nombreCompleto} </span>
              </div>
            )}
          />
          <Column
            title="Codigo"
            key="codigoRastreo"
            width="16%"
            render={record => (
              <div>
                <span> {record.codigoRastreo} </span>
              </div>
            )}
          />
          <Column
            title="Origen"
            key="origen"
            width="16%"
            render={record => (
              <div>
                <span> {record.oficinaOrigen.pais.nombre} </span>
              </div>
            )}
          />
          <Column
            title="Destino"
            key="destino"
            width="16%"
            render={record => (
              <div>
                <span> {record.oficinaDestino.pais.nombre} </span>
              </div>
            )}
          />
          <Column
            title="Fecha Registro"
            key="fechaIngresoString"
            width="16%"
            render={record => (
              <div>
                <span> {record.fechaIngresoString} </span>
              </div>
            )}
          />
          <Column
            title="Estado"
            dataIndex="estado"
            key="estado"
            width="20%"
            align="center"
            render={record => (
              <div>
                <span> {record.name} </span>
              </div>
            )}
          />
          <Column
            width="50px"
            title=""
            key="action"
            render={record => {
              const menu = (
                <Menu>
                  <Menu.Item onClick={() => onDetalle(record.id)}>
                    Detalle
                  </Menu.Item>
                </Menu>
              );
              return (
                <Dropdown overlay={menu} placement="bottomRight">
                  <a className="ant-dropdown-link" href="#">
                    <Icon type="setting" theme="outlined" />
                  </a>
                </Dropdown>
              );
            }}
          />
        </CrimsonTable>
      </div>
    );
  }
}
