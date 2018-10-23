import React from 'react';
import { Table, Tag, Menu, Dropdown, Icon,Modal} from 'antd';
import MenuItem from 'antd/lib/menu/MenuItem';
import API from '../../Services/Api';

const { Column, ColumnGroup } = Table;

const confirm = Modal.confirm;
  
export default class UsuarioList extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      usuarios: []
    }

  }

  componentDidMount() {
    this.list();
  }

  list = () => {
    API.get('usuarios')
      .then(response => {
        this.setState({...this.state, usuarios: response.data});
    })
  }

  showConfirmDesactivar=(record)=> {
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
  
  showConfirmActivar=(record)=> {
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

  editarUsuario=(record)=>{

  }

    render(){
        return (
            <Table dataSource={this.state.usuarios}>
              <Column
                title="Nombres"
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
              render={ record => { 
                const menu = (
                  <Menu>
                    {
                      record.estado.name === 'ACTIVO' ? 
                      ( 
                        <Menu.Item>
                        <a target="_blank" rel="noopener noreferrer" onClick={this.showConfirmDesactivar.bind(this, record)}> Desactivar</a> 
                        </Menu.Item>
                       ) :
                      ( <Menu.Item>
                        <a target="_blank" rel="noopener noreferrer" onClick={this.showConfirmActivar.bind(this, record)}> Activar</a> 
                        </Menu.Item>)
                    }

                    {
                      record.estado.name === 'ACTIVO' ? 
                      ( 
                        <Menu.Item>
                        <a target="_blank" rel="noopener noreferrer" onClick={this.editarUsuario.bind(this, record)}> Editar</a> 
                        </Menu.Item>
                        ) :
                      ( null )
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
          </Table>
        )
    }
}


