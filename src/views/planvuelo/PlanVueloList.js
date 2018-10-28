import React from 'react';
import { Table, Tag, Menu, Dropdown, Icon } from 'antd';
import API from '../../Services/Api';
import CrimsonTable from '../../components/CrimsonTable';

const { Column } = Table;

export default class PlanVueloList extends React.Component {
    
  constructor(props) {
    super(props);
    this.listRef = React.createRef();
  }

  fetch = () => {
    this.listRef.current.fetch();
  };

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
        const { updateAction } = this.props;
        return (
            <CrimsonTable url="/planvuelo" ref={this.listRef}>
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
              title="Salida"
              dataIndex="horaInicioString"
              key="salida"
              align="center"
            />
            <Column
              title="Llegada"
              dataIndex="horaFinString"
              key="llegada"
              align="center"
            />
            <Column
              title="Duración"
              dataIndex="duracion"
              key="duracion"
              align="center"
            />
            <Column
              title="Estado"
              dataIndex="estado"
              key="estado"
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
              width="40px"
              title=""
              key="action"
              render={ record => { 
                const menu = (
                  <Menu>
                    <Menu.Item onClick={updateAction.bind(this, record.id)}>
                      Editar
                    </Menu.Item>
                    {
                      record.estado.name === 'ACTIVO' ? 
                      ( <Menu.Item onClick={this.desactivar.bind(this, record)}> Desactivar</Menu.Item> ) :
                      ( <Menu.Item onClick={this.activar.bind(this, record)}> Activar</Menu.Item> )
                    }
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
          </CrimsonTable>
        )
    }
}