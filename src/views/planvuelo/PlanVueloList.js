import React from 'react';
import { Table, Tag, Menu, Dropdown, Icon } from 'antd';
import API from '../../Services/Api';

const { Column } = Table;

export default class PlanVueloList extends React.Component {
    
    constructor(props){
      super(props);

      this.state = {
        list: []
      }
    }

    componentDidMount() {
      this.list();
    }

    list = () => {
      this.setState({...this.state, loading: true}, () => {
        API.get('planvuelo')
        .then(response => {
          this.setState({...this.state, list: response.data.vuelos}, () => {
            this.setState({...this.state, loading: false});
          });
        })
      })
      
    }

    activar = (record) => {
      API.post(`planvuelo/vuelos/${record.id}/activar`)
      .then(response => {
        this.list();
      })
    }

    desactivar = (record) => {
      API.post(`planvuelo/vuelos/${record.id}/desactivar`)
      .then(response => {
        this.list();
      })
    }

    render(){
        return (
            <Table dataSource={this.state.list} loading={this.state.loading} rowKey="id" pagination={{pageSize: 8}}>
              <Column
                title="Origen"
                key="origen"
                render={record => (
                  <div>
                    <div>
                      <b> { record.oficinaOrigen.pais.nombre } </b>
                  </div>
                  <small> { record.oficinaOrigen.codigo } </small>
                  </div>
                )}
              />
              <Column
                title="Destino"
                key="destino"
                render={record => (
                  <div>
                    <div>
                      <b> { record.oficinaDestino.pais.nombre } </b>
                  </div>
                  <small> { record.oficinaDestino.codigo } </small>
                  </div>
                )}
              />
            <Column
              title="Inicio"
              dataIndex="horaInicioString"
              key="age"
            />
            <Column
              title="Duración"
              dataIndex="horaFinString"
              key="address"
            />
            <Column
              title="Estado"
              dataIndex="estado"
              key="estado"
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
              width="40px"
              title=""
              key="action"
              render={ record => { 
                const menu = (
                  <Menu>
                    <Menu.Item>
                      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">Editar</a>
                    </Menu.Item>
                    <Menu.Item>
                    {
                      record.estado.name === 'ACTIVO' ? 
                      ( <a target="_blank" rel="noopener noreferrer" onClick={this.desactivar.bind(this, record)}> Desactivar</a> ) :
                      ( <a target="_blank" rel="noopener noreferrer" onClick={this.activar.bind(this, record)}> Activar</a> )
                    }
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