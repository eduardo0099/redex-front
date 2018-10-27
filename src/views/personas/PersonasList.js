import React from "react";
import { Table, Menu, Dropdown, Icon } from "antd";

import CrimsonTable from "../../components/CrimsonTable";

const { Column } = Table;

export default class PersonasList extends React.Component {
  editarUsuario = record => {};

  render() {
    return (
      <CrimsonTable url="/personas">
        <Column
          title="Nombre"
          key="nombres"
          render={record => (
            <div>
              <div>
                <b>
                  {" "}
                  {record.nombres} {record.paterno} {record.materno}{" "}
                </b>
              </div>
              <small>
                {" "}
                {record.tipoDocumentoIdentidad.simbolo}{" "}
                {record.numeroDocumentoIdentidad}{" "}
              </small>
            </div>
          )}
        />
        <Column
          title="Pais"
          key="pais"
          render={record => (
            <div>
              <div>
                <b> {record.pais.nombre} </b>
              </div>
              <small> {record.pais.codigo} </small>
            </div>
          )}
        />
        <Column title="Email" dataIndex="email" key="email" />
        <Column title="Telefono" dataIndex="telefono" key="telefono" />
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
                    onClick={this.editarUsuario.bind(this, record)}
                  >
                    {" "}
                    Editar
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
