import React from "react";
import { Table, Tag, Dropdown, Menu, Icon} from "antd";
import API from "../../Services/Api";
import CrimsonTable from "../../components/CrimsonTable";

const { Column } = Table;

export default class OficinasList extends React.Component {
  
  constructor(props) {
    super(props);
    this.listRef = React.createRef();
  }

  fetch = () => {
    this.listRef.current.fetch();
  };

  activar = record => {
    API.post(`oficinas/${record.id}/activar`).then(response => {
      this.fetch();
    });
  };

  desactivar = record => {
    API.post(`oficinas/${record.id}/desactivar`).then(response => {
      this.fetch();
    });
  };

  render() {
    const { updateAction } = this.props;
    return (
      <CrimsonTable url="/oficinas" ref={this.listRef}>
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
                    onClick={updateAction.bind(this, record.id)}
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
                      Desactivar
                    </a>
                  ) : (
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={this.activar.bind(this, record)}
                    >
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
