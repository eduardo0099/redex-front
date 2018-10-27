import React from "react";
import { Table, Tag, Dropdown, Menu, Icon, Input, Col, Row } from "antd";
import API from "../../Services/Api";
import CrimsonTable from "../../components/CrimsonTable";

const { Column } = Table;
const Search = Input.Search;

export default class OficinasList extends React.Component {
  constructor(props) {
    super(props);
  }

  list = () => {};

  activar = record => {
    API.post(`oficinas/${record.id}/activar`).then(response => {
      this.list();
    });
  };

  desactivar = record => {
    API.post(`oficinas/${record.id}/desactivar`).then(response => {
      this.list();
    });
  };

  render() {
    return (
      <CrimsonTable url="/oficinas">
        <Column
          title="País"
          key="codigo"
          width="30%"
          render={record => (
            <div>
              <div>
                <b> {record.pais.nombre} </b>
              </div>
              <small> {record.codigo} </small>
            </div>
          )}
        />
        <Column
          title="Capacidad"
          key="capacidad"
          align="center"
          width="50%"
          render={record => (
            <span>
              {" "}
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
              case "ACTIVO":
                return <Tag color="green"> Activo </Tag>;
              case "INACTIVO":
                return <Tag color="red"> Inactivo </Tag>;
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
                    href="http://www.alipay.com/"
                  >
                    Editar
                  </a>
                </Menu.Item>
                <Menu.Item>
                  {record.estado.name === "ACTIVO" ? (
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={this.desactivar.bind(this, record)}
                    >
                      {" "}
                      Desactivar
                    </a>
                  ) : (
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={this.activar.bind(this, record)}
                    >
                      {" "}
                      Activar
                    </a>
                  )}
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
