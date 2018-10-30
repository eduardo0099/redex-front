import React from "react";
import { Table, Tag, Dropdown, Menu, Icon} from "antd";
import API from "../../Services/Api";
import CrimsonTable from "../../components/CrimsonTable";

const { Column } = Table;

export default class PaisesList extends React.Component {
  constructor(props) {
    super(props);
    this.listRef = React.createRef();
  }

  fetch = () => this.listRef.current.fetch();

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
      <CrimsonTable url="/paises" ref={this.listRef}>
        <Column
          title="Nombre"
          key="nombre"
          width="40%"
          render={r => (
              <div>
                <b style={{display: 'block'}}> {r.nombre} </b>
            <small> {r.codigo} </small>
                </div>
          )}
        />
          <Column
          title="ISO"
          key="estado"
          width="35%"
          render={r => (
              <span> {r.codigoIso} </span>
          )}
        />
        <Column
          title="Continente"
          key="continente"
          width="45%"
          render={r => (
            <span>  { r.continente.nombre } </span>
          )}
        />
      
        <Column
          width="50px"
          title=""
          key="action"
          render={record => {
            const menu = (
              <Menu>
                <Menu.Item onClick={updateAction.bind(this, record.id)}>
                    Editar
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
    );
  }
}
