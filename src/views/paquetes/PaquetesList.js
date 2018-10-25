import React from 'react';
import { Table, Tag, Dropdown, Menu, Icon} from 'antd';
import API from '../../Services/Api';

const { Column } = Table;

export default class PaquetesList extends React.Component {
    
  constructor(props){
    super(props)
    this.state = {
      paquetes: [{
        "codigo":"4555",
        "Origen":"Peru",
        "Destino":"España",
        "fechaIngreso":"12/09/18",
        "fecha Ingreso":"13/09/18",
        "estado":"ACTIVO",
      }],
      loading: false
    }
  }

  componentDidMount() {
    this.list();
  }

  list = () => {
    //this.setState({...this.state, loading: true}, () => {
    //  API.get('oficinas')
    //    .then(response => {
    //      this.setState({...this.state, oficinas: response.data, loading: false});
    //  });
    //});
  }

  mostrarDetalle = (record) => {

  }
    render(){
        return (
            <Table dataSource={this.state.paquetes} loading={this.state.loading} pagination={{pageSize: 9}} rowKey="id">
              <Column
                title="Codigo"
                key="codigo"
                width="16%"
              />
              <Column
                title="Origen"
                key="origen"
                width="16%"
              />
              <Column
                title="Destino"
                key="destino"
                width="16%"
              />
              <Column
                title="Fecha Ingreso"
                key="fechaIngreso"
                width="16%"
              />
              <Column
                title="Fecha Salida"
                key="fechaSalida"
                width="16%"
              />
            <Column
              title="Estado"
              dataIndex="estado"
              key="estado"
              width="20%"
              align="center"
              render={estado => {
                  switch(estado.name){
                    case 'ACTIVO':
                      return (<Tag color="green"> Activo </Tag>);
                    case 'INACTIVO':
                      return (<Tag color="red"> Inactivo </Tag>);
                    default:
                      return null;
                  }
              }}
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