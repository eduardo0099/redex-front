import React from 'react';
import { Modal, Form, Table,Divider } from 'antd';
import API from '../../Services/Api'
const FormItem = Form.Item;
const { Column } = Table;


class InnerForm extends React.Component {
 
  constructor(props){
    super(props);
  }


  onSelect = (el) =>  {

  }

    render() {
      const { visible, close, title, form, paquete, ruta} = this.props;
      
      return (
          <Modal
          visible={visible}
          title={title}
          onCancel={ close }
          footer={ null }
        >
          <Form layout="vertical">
          <Divider orientation="left">Origen</Divider>
            <FormItem label={this.props.id}>
            </FormItem>
            <FormItem label="Oficina">
            <span>  { paquete.id ? paquete.oficinaOrigen.codigo : '' } </span>
            </FormItem>
            <FormItem label="Fecha">
            <span>  { paquete.id ? paquete.fechaIngresoString : '' } </span>

            </FormItem>
          <Divider orientation="left">Destino</Divider>
            <FormItem label="Cliente">
            </FormItem>
            <FormItem label="Oficina">
            </FormItem>
            <FormItem label="Fecha">
            </FormItem>
          <Divider orientation="left">Ruta</Divider>
          <FormItem label="Estado">
            </FormItem>
          <Table size="small" dataSource={paquete.paqueteRutas}>
              <Column
                title="Ciudad Partida"
                key="cliente"
                width="16%"
                render = {r => (
                  <span> ohla </span>
                )}
              />
              <Column
                    title="Tiempo Partida"
                    key="cliente"
                    width="16%"
              />
              <Column
                    title="Ciudad Llegada"
                    key="cliente"
                    width="16%"
              />
              <Column
                title="Tiempo Llegada"
                key="cliente"
                width="16%"
              />
          </Table>
          </Form>
        </Modal>
        );
        
    }
}

const WrappedForm = Form.create()(InnerForm);

export default class PaquetesDetail extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      visible: false,
      paquete: { paqueteRutas: [] }
    }
  }
  
  detail = (id) => {
    API.get(`paquetes/${id}`)
      .then(response => {
        this.setState({...this.state, paquete: response.data, visible: true, title: `Paquete ${response.data.codigoRastreo}`})
      })
  }

  close = () => {
    this.setState({...this.state, visible: false})
  }

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render(){
    return (
      <WrappedForm 
        wrappedComponentRef={this.saveFormRef}
        visible={this.state.visible}
        close={this.close}
        title={this.state.title}
        action={this.state.action}
        paquete = { this.state.paquete }
      />
    )
  }
}
