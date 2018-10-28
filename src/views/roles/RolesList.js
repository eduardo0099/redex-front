import React from "react";
import { Table, Input } from "antd";
import API from "../../Services/Api";
import CrimsonTable from "../../components/CrimsonTable";

const { Column } = Table;
const Search = Input.Search;

export default class RolesList extends React.Component {
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
      <CrimsonTable url="/roles">
         <Column
          title=""
          key="codigo"
          width="30%"
          render={record => (
            <div>
              <div>
                <b> {record.nombre} </b>
              </div>
              <small> {record.codigo.name} </small>
            </div>
          )}
        />
      </CrimsonTable>
    );
  }
}
