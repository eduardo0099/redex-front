import React from 'react';
import { Table, Tag, Menu, Dropdown, Icon,Modal} from 'antd';

const { Column, ColumnGroup } = Table;

const confirm = Modal.confirm;

function showConfirmDesactivar() {
  confirm({
    title: 'Usted desea desactivar a este usuario?',
    content: 'Si usted desactiva al usuario, este no tendra acceso al sistema',
    onCancel() {
      console.log('Cancelar');
    },
    onOk() {
      console.log('OK');
    },
  });
}

function showConfirmActivar() {
  confirm({
    title: 'Usted desea activar a este usuario?',
    content: 'Si usted activa al usuario, este tendra acceso al sistema',
    onCancel() {
      console.log('Cancelar');
    },
    onOk() {
      console.log('OK');
    },
  });
}

const data = [{
    id: '1',
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
        <a target="_blank" onClick={showConfirmDesactivar}>Desactivar</a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" onClick={showConfirmActivar}>Activar</a>
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


