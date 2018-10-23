import React from 'react';
import { Table, Divider, Tag } from 'antd';

const { Column, ColumnGroup } = Table;


const data = [{
    key: '1',
    firstName: 'John',
    lastName: 'Brown',
    docId:'47945555',
    office:'Madrid',
    email:'johnBrown@gmail.com',
    phone: '980456321',
  }];


export default class UsuarioList extends React.Component {
    
    render(){
        return (
            <Table dataSource={data}>
              <Column
                title="First Name"
                dataIndex="firstName"
                key="firstName"
              />
              <Column
                title="Last Name"
                dataIndex="lastName"
                key="lastName"
              />
            <Column
              title="Doc Identidad"
              dataIndex="docId"
              key="docId"
            />
            <Column
              title="Oficina"
              dataIndex="office"
              key="office"
            />
            <Column
              title="Email"
              dataIndex="email"
              key="email"
            />
            <Column
              title="Action"
              key="action"
              render={(text, record) => (
                <span>
                  <a href="javascript:;">Modificar</a>
                  <Divider type="vertical" />
                  <a href="javascript:;">Eliminar</a>
                </span>
              )}
            />
          </Table>
        )
    }
}


