import React from 'react';
import { Table, Tag, Dropdown, Menu, Icon} from 'antd';
import API from '../../Services/Api';

const { Column } = Table;

export default class PaquetesList extends React.Component {
    
  constructor(props){
    super(props)
    this.state = {
      paquetes: [],
      loading: false
    }
  }

  componentDidMount() {
    this.list();
  }

  list = () => {
    this.setState({...this.state, loading: true}, () => {
      API.get('paquetes')
        .then(response => {
          this.setState({...this.state, paquetes: response.data, loading: false});
      });
    });
  }

  mostrarDetalle = (record) => {
    
  }
    render(){
        return (
            <Table dataSource={this.state.paquetes} loading={this.state.loading} pagination={{pageSize: 9}} rowKey="id">
              <Column
                title="Cliente"
                key="cliente"
                width="16%"
                render={record=>(
                  <div>
                  <span> { record.personaOrigen.nombreCompleto } </span>
                  </div>
                )}
              />
              <Column
                title="Codigo"
                key="codigoRastreo"
                width="16%"
                render={record=>(
                  <div>
                  <span> { record.codigoRastreo } </span>
                  </div>
                )}
              />
              <Column
                title="Origen"
                key="origen"
                width="16%"
                render={record=>(
                  <div>
                  <span> { record.oficinaOrigen.pais.nombre } </span>
                  </div>
                )}
              />
              <Column
                title="Destino"
                key="destino"
                width="16%"
                render={record=>(
                  <div>
                  <span> { record.oficinaDestino.pais.nombre } </span>
                  </div>
                )}
              />
              <Column
                title="Fecha Registro"
                key="fechaIngresoString"
                width="16%"
                render={record=>(
                  <div>
                  <span> { record.fechaIngresoString } </span>
                  </div>
                )}
              />
            <Column
              title="Estado"
              dataIndex="estado"
              key="estado"
              width="20%"
              align="center"
              render={record=>(
                <div>
                <span> { record.estado.name } </span>
                </div>
              )}
            />
            <Column
              width="50px"
              title=""
              key="action"
              render={ record => { 
                const menu = (
                  <Menu>
                    <Menu.Item>
                      <a target="_blank" rel="noopener noreferrer" onClick={this.mostrarDetalle.bind(this,record)}>Detalle</a>
                    </Menu.Item>
                  </Menu>
                );
                return (
                  <Dropdown overlay={menu}>
                  <a className="ant-dropdown-link" href="#">
                    <Icon type="setting" theme="outlined" />
                  </a>
                </Dropdown>
              )}}
            />
          </Table>
        )
    }
}