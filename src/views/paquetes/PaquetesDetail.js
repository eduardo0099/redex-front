import React from 'react';
import { Modal, Form, Input, AutoComplete } from 'antd';
import API from '../../Services/Api'
const FormItem = Form.Item;

class PaquetesDetail extends React.Component {
 
  constructor(props){
    super(props);

    this.state = {
      paises: [],
      dataSource: []
    }
  }

  componentDidMount(){

  }


  handleSearch = (value) => {
    this.setState({...this.state,
      dataSource: !value ? [] : [
        value,
        value + value,
        value + value + value,
      ],
    });
  }

  onSelect = (el) =>  {

  }

    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      
      return (
          <Modal
          visible={visible}
          title="Detalle de paquete"
          okText="Ok"
          onCancel={onCancel}
          onCreate={onCreate}
        >
          <Form layout="vertical">
            <FormItem label="Cliente">
            </FormItem>
            <FormItem label="Capacidad">
            </FormItem>
          </Form>
        </Modal>
        );
        
    }
}

const WrappedForm = Form.create()(PaquetesDetail);

export default WrappedForm;