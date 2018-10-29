import React from 'react';
import { Table, Menu, Dropdown, Icon,Modal, Tag} from 'antd';
import API from '../../Services/Api';
import CrimsonTable from '../../components/CrimsonTable';

const { Column } = Table;

const confirm = Modal.confirm;
  
export default class UsuarioList extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      usuarios: [],
      loading: false,
    }

  }

  componentDidMount() {
    this.list();
  }

  list = () => {
    this.setState({...this.state, loading: true}, () => {
      API.get('usuarios')
        .then(response => {
          this.setState({...this.state, usuarios: response.data, loading: false});
      });
    });
  }

  showConfirmDesactivar=(record)=> {
    confirm({
      title: 'Usted desea desactivar a este usuario?',
      content: 'Si usted desactiva al usuario, este no tendrá acceso al sistema',
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
            <CrimsonTable url="/usuarios">
              <Column
                title="Persona"
                key="nombres"
                render={record=>(
                  <div>
                  <div>
                  <b> { record.colaborador.persona.nombreCompleto } </b>
                  </div>
                  <small> { record.colaborador.persona.tipoDocumentoIdentidad.simbolo } { record.colaborador.persona.numeroDocumentoIdentidad } </small>
                  </div>
                )}
              />
               <Column
              title="Rol"
              key="rol"
              render={record=>(
                <span> { record.rol.nombre } </span>
              )}
            />
            <Column
              title="Oficina"
              key="office"
              render={record=>(
                <div>
                <div>
                <b> { record.colaborador.oficina.pais.nombre } </b>
                </div>
                <small> { record.colaborador.oficina.codigo }</small>
                </div>
              )}
            />
            <Column
              title="Email"
              key="email"
              render={record=>(
                <div>
                <span> { record.colaborador.persona.email } </span>
                </div>
              )}
            />
               <Column
              title="Estado"
              key="estado"
              render={record=>{
                switch (record.estado.name) {
                  case "ACTIVO":
                    return <Tag color="green"> Activo </Tag>;
                  case "INACTIVO":
                    return <Tag color="red"> Inactivo </Tag>;
                  default:
                    return null;
                }
                }
              }
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
          </CrimsonTable>
        )
    }
}


