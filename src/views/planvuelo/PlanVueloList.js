import React from 'react';
import { Table, Tag, Menu, Dropdown, Icon } from 'antd';

const { Column } = Table;

const oficinas = [
    {codigo: 'PER', pais: {nombre: "Peru"}, capacidadActual: 0, capacidadMaxima: 200}
]

const data = [
  {
    key: '1',
    origen: 'Lima, Peru',
    destino: 'Paris, Francia',
    inicio: '09:00 AM',
    duracion: '8h 45m',
    estado: 'ACTIVO',
  }, {
    key: '2',
    origen: 'Lima, Peru',
    destino: 'Paris, Francia',
    inicio: '09:00 AM',
    duracion: '8h 45m',
    estado: 'ACTIVO',
  }, {
    key: '3',
    origen: 'Lima, Peru',
    destino: 'Paris, Francia',
    inicio: '09:00 AM',
    duracion: '8h 45m',
    estado: 'INACTIVO',
  }, {
    key: '2',
    origen: 'Lima, Peru',
    destino: 'Paris, Francia',
    inicio: '09:00 AM',
    duracion: '8h 45m',
    estado: 'ACTIVO',
  }, {
    key: '3',
    origen: 'Lima, Peru',
    destino: 'Paris, Francia',
    inicio: '09:00 AM',
    duracion: '8h 45m',
    estado: 'INACTIVO',
  }, {
    key: '2',
    origen: 'Lima, Peru',
    destino: 'Paris, Francia',
    inicio: '09:00 AM',
    duracion: '8h 45m',
    estado: 'ACTIVO',
  }, {
    key: '3',
    origen: 'Lima, Peru',
    destino: 'Paris, Francia',
    inicio: '09:00 AM',
    duracion: '8h 45m',
    estado: 'INACTIVO',
  }, {
    key: '2',
    origen: 'Lima, Peru',
    destino: 'Paris, Francia',
    inicio: '09:00 AM',
    duracion: '8h 45m',
    estado: 'ACTIVO',
  }, {
    key: '3',
    origen: 'Lima, Peru',
    destino: 'Paris, Francia',
    inicio: '09:00 AM',
    duracion: '8h 45m',
    estado: 'INACTIVO',
  }, {
    key: '2',
    origen: 'Lima, Peru',
    destino: 'Paris, Francia',
    inicio: '09:00 AM',
    duracion: '8h 45m',
    estado: 'ACTIVO',
  }, {
    key: '3',
    origen: 'Lima, Peru',
    destino: 'Paris, Francia',
    inicio: '09:00 AM',
    duracion: '8h 45m',
    estado: 'INACTIVO',
  }, {
    key: '2',
    origen: 'Lima, Peru',
    destino: 'Paris, Francia',
    inicio: '09:00 AM',
    duracion: '8h 45m',
    estado: 'ACTIVO',
  }, {
    key: '3',
    origen: 'Lima, Peru',
    destino: 'Paris, Francia',
    inicio: '09:00 AM',
    duracion: '8h 45m',
    estado: 'INACTIVO',
  }, {
    key: '2',
    origen: 'Lima, Peru',
    destino: 'Paris, Francia',
    inicio: '09:00 AM',
    duracion: '8h 45m',
    estado: 'ACTIVO',
  }, {
    key: '3',
    origen: 'Lima, Peru',
    destino: 'Paris, Francia',
    inicio: '09:00 AM',
    duracion: '8h 45m',
    estado: 'INACTIVO',
  }, {
    key: '2',
    origen: 'Lima, Peru',
    destino: 'Paris, Francia',
    inicio: '09:00 AM',
    duracion: '8h 45m',
    estado: 'ACTIVO',
  }, {
    key: '3',
    origen: 'Lima, Peru',
    destino: 'Paris, Francia',
    inicio: '09:00 AM',
    duracion: '8h 45m',
    estado: 'INACTIVO',
  }, {
    key: '2',
    origen: 'Lima, Peru',
    destino: 'Paris, Francia',
    inicio: '09:00 AM',
    duracion: '8h 45m',
    estado: 'ACTIVO',
  }, {
    key: '3',
    origen: 'Lima, Peru',
    destino: 'Paris, Francia',
    inicio: '09:00 AM',
    duracion: '8h 45m',
    estado: 'INACTIVO',
  }, {
    key: '2',
    origen: 'Lima, Peru',
    destino: 'Paris, Francia',
    inicio: '09:00 AM',
    duracion: '8h 45m',
    estado: 'ACTIVO',
  }, {
    key: '3',
    origen: 'Lima, Peru',
    destino: 'Paris, Francia',
    inicio: '09:00 AM',
    duracion: '8h 45m',
    estado: 'INACTIVO',
  }
];

  const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">Editar</a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">Desactivar</a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">Activar</a>
      </Menu.Item>
    </Menu>
  );

export default class PlanVueloList extends React.Component {
    
    render(){
        return (
            <Table dataSource={data}>
              <Column
                title="Origen"
                dataIndex="origen"
                key="firstName"
              />
              <Column
                title="Destino"
                dataIndex="destino"
                key="lastName"
              />
            <Column
              title="Inicio"
              dataIndex="inicio"
              key="age"
            />
            <Column
              title="Duración"
              dataIndex="duracion"
              key="address"
            />
            <Column
              title="Estado"
              dataIndex="estado"
              key="estado"
              render={estado => {
                  switch(estado){
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
              render={(text, record) => (
                <Dropdown overlay={menu}>
                  <a className="ant-dropdown-link" href="#">
                    <Icon type="setting" theme="outlined" />
                  </a>
                </Dropdown>
              )}
            />
          </Table>
        )
    }
}