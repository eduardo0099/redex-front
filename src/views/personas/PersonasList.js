import React from "react";
import { Table, Menu, Dropdown, Icon } from "antd";

import CrimsonTable from "../../components/CrimsonTable";

const { Column } = Table;

export default class PersonasList extends React.Component {
  constructor(props){
    super(props)
    this.listRef = React.createRef();
  }
  fetch = () => this.listRef.current.fetch();
  saveFormRef = (listRef) => {
    this.listRef = listRef;
  }

  render() {
    const {editarPersona}  = this.props;
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
                    onClick={()=>editarPersona(record.id)}
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
