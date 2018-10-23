import React from 'react';
import { Table, Tag, Menu, Dropdown, Icon } from 'antd';

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


