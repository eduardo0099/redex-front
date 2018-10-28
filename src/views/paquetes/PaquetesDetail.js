import React from 'react';
import { Modal, Form, Input, AutoComplete, Table,Divider } from 'antd';
import API from '../../Services/Api'
const FormItem = Form.Item;
const { Column } = Table;
class PaquetesDetail extends React.Component {
 
  constructor(props){
    super(props);

    this.state = {
      detalle: []
    }
  }

  componentDidMount(){

  }


  onSelect = (el) =>  {

  }

    render() {
      const { visible, onCancel, onOk, form } = this.props;
      
      
      return (
          <Modal
          visible={visible}
          title="Detalle de paquete"
          okText="Ok"
          cancelText="Cancelar"
          onCancel={onCancel}
          onOk={onOk}
        >
          <Form layout="vertical">
          <Divider orientation="left">Origen</Divider>
            <FormItem >
            
            </FormItem>
            <FormItem label="Oficina">
            </FormItem>
            <FormItem label="Fecha">
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
          <Table>
              <Column
                title="Ciudad Partida"
                key="cliente"
                width="16%"
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

const WrappedForm = Form.create()(PaquetesDetail);

export default WrappedForm;