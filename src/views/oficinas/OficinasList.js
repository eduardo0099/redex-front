import React from "react";
import { Table, Tag, Dropdown, Menu, Icon,Modal,Form,DatePicker} from "antd";
import API,{getFile} from "../../Services/Api";
import CrimsonTable from "../../components/CrimsonTable";
import Notify from '../../utils/notify';

const { Column } = Table;
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;

export default class OficinasList extends React.Component {
  constructor(props) {
    super(props);
    this.listRef = React.createRef();
    this.state={
      visible:false,
      idPais:"",
      fechaInicio:"",
      fechFin:"",
      btnOk:true,
    }
  }

  fetch = () => {
    this.listRef.current.fetch();
  };

  activar = record => {
    API.post(`oficinas/${record.id}/activar`).then(response => {
      this.fetch();
    });
  };

  desactivar = record => {
    API.post(`oficinas/${record.id}/desactivar`).then(response => {
      this.fetch();
    });
  };

  emitirReporte = () =>{
    let fecha_ini=this.state.fechaInicio.format('YYYY-MM-DD');
    let fecha_fin=this.state.fechaFin.format('YYYY-MM-DD');
    if(this.state.fechaInicio ==="" && this.state.fechaFin==""){

      Notify.warning({
        message: 'No se ha seleccionado el rango de fechas'
      });
    }
    else{
      API.get(`reportes/auditoria`,{
        params:{
          inicio:fecha_ini,
          fin:fecha_fin,
          idOficina:this.state.idPais
        },
        responseType:"arraybuffer"
      }).then(response=>{
        getFile(response);
        Notify.success({
          message: 'El reporte de auditoria se genero correctamente'
        });
      }).catch((error)=>{
        Notify.error({
          message: 'El reporte de auditoria no se genero'
        });
      })
      this.setState({
        ...this.values, btnOk:true,
      })
    }
  }

  chooseFecha = values =>{
    this.setState({
      ...this.values,
      fechaInicio: values[0],
      fechaFin: values[1],
      btnOk:false
    }
    )
  };

  showModal = id =>{
    this.setState({
      visible:true,
      idPais : id
    })
  }

  cancelModal = () =>{
    this.setState({
      visible:false,
    })
  }

  render() {
    const { updateAction } = this.props;
    return (
      <div>
      <CrimsonTable url="/oficinas" ref={this.listRef}>
        <Column
          title="País"
          key="codigo"
          width="30%"
          render={record => (
            <div>
              <div>
                <b> {record.pais.nombre} </b>
              </div>
              <small> {record.codigo} </small>
            </div>
          )}
        />
        <Column
          title="Capacidad"
          key="capacidad"
          align="center"
          width="50%"
          render={record => (
            <span>
              {" "}
              {record.capacidadActual}/{record.capacidadMaxima}
            </span>
          )}
        />
        <Column
          title="Estado"
          dataIndex="estado"
          key="estado"
          width="20%"
          align="center"
          render={estado => {
            switch (estado.name) {
              case "ACTIVO":
                return <Tag color="green"> Activo </Tag>;
              case "INACTIVO":
                return <Tag color="red"> Inactivo </Tag>;
              default:
                return null;
            }
          }}
        />
        <Column
          width="50px"
          title=""
          key="action"
          render={record => {
            const menu = (
              <Menu>
                <Menu.Item>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={updateAction.bind(this, record.id)}
                  >
                    Editar
                  </a>
                </Menu.Item>
                <Menu.Item>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={()=>this.showModal(record.id)}
                  >
                    Auditoria
                  </a>
                </Menu.Item>
                <Menu.Item>
                  {record.estado.name === "ACTIVO" ? (
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={this.desactivar.bind(this, record)}
                    >
                      Desactivar
                    </a>
                  ) : (
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={this.activar.bind(this, record)}
                    >
                      Activar
                    </a>
                  )}
                </Menu.Item>
              </Menu>
            );
            return (
              <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" href="#">
                  <Icon type="setting" theme="outlined" />
                </a>
              </Dropdown>
            );
          }}
        />
      </CrimsonTable>
      <Modal 
      visible={this.state.visible}
      onCancel = {this.cancelModal}
      onOk = {this.emitirReporte}
      title ="Emitir reporte de auditoria"
      okText="Generar"
      okButtonDisabled = {this.state.btnOk}
      >
      <FormItem label="Ingresar el rango de fechas"></FormItem>
      <RangePicker
        style={{ width: "100%" }}
        format="DD/MM/YYYY"
        onChange={this.chooseFecha}/>
      </Modal>
      </div>
    );
  }
}
