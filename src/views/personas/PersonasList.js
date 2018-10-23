import React from 'react';
import { Table, Tag, Menu, Dropdown, Icon,Modal} from 'antd';
import MenuItem from 'antd/lib/menu/MenuItem';

const { Column, ColumnGroup } = Table;

const confirm = Modal.confirm;



const data = [{
    id: '1',
    nombres: 'John',
    paterno: 'Brown',
    docId:'47945555',
    tipoDoc: 'DNI',
    pais:'Madrid',
    email:'johnBrown@gmail.com',
    telefono: '980456321',
  }];


  
export default class PersonasList extends React.Component {

  editarUsuario=(record)=>{

  }

    render(){
        return (
            <Table dataSource={data}>
              <Column
                title="Nombre"
                dataIndex="nombre"
                key="nombres"
              />
              <Column
                title="Apellido"
                dataIndex="apellido"
                key="paterno"
              />
              <Column
              title="Tipo Documento"
              dataIndex="tipoDoc"
              key="tipoDoc"
            />
            <Column
              title="Doc Identidad"
              dataIndex="docId"
              key="docId"
            />
            <Column
              title="Pais"
              dataIndex="pais"
              key="pais"
            />
            <Column
              title="Email"
              dataIndex="email"
              key="email"
            />
            <Column
              title="Telefono"
              dataIndex="telefono"
              key="telefono"
            />
            <Column
              width="50px"
              title=""
              key="action"
              render={ record => { 
                const menu = (
                  <Menu>
                    <Menu.Item>
                        <a target="_blank" rel="noopener noreferrer" onClick={this.editarUsuario.bind(this, record)}> Editar</a> 
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


