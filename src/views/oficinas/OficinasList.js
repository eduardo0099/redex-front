import React from 'react';
import { Table, Tag, Dropdown, Menu, Icon} from 'antd';
import API from '../../Services/Api';

const { Column, ColumnGroup } = Table;

export default class OficinasList extends React.Component {
    
  constructor(props){
    super(props)
    this.state = {
      oficinas: [],
      loading: false
    }

  }

  componentDidMount() {
    this.list();
  }

  list = () => {
    this.setState({...this.state, loading: true}, () => {
      API.get('oficinas')
        .then(response => {
          this.setState({...this.state, oficinas: response.data, loading: false});
      });
    });
  }

  activar = (record) => {
    API.post(`oficinas/${record.id}/activar`)
    .then(response => {
      this.list();
    })
  }

  desactivar = (record) => {
    API.post(`oficinas/${record.id}/desactivar`)
    .then(response => {
      this.list();
    })
  }
    render(){
      

        return (
            <Table dataSource={this.state.oficinas} loading={this.state.loading} pagination={{pageSize: 9}} rowKey="id">
              <Column
                title="País"
                key="codigo"
                width="30%"
                render={record => (
                  <div>
                    <div>
                  <b> { record.pais.nombre } </b>
                  </div>
                  <small> { record.codigo } </small>
                  </div>
                )}
              />
              <Column
                title="Capacidad"
                key="capacidad"
                align="center"
                width="50%"
                render={record => (
                  <span> {record.capacidadActual}/{record.capacidadMaxima}</span>
                )}
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