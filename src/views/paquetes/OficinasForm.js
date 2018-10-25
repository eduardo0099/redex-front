import React from 'react';
import { Modal, Form, Input, AutoComplete } from 'antd';
import API from '../../Services/Api'
const FormItem = Form.Item;

class OficinasForm extends React.Component {
 
  constructor(props){
    super(props);

    this.state = {
      paises: [],
      dataSource: []
    }
  }

  componentDidMount(){
    this.fetchPaises();
  }

  fetchPaises = () => {
    API.get('paises')
      .then(response => {
        //console.log(response.data);
        //this.setState({...this.state, dataSource: response.data, paises:response.data});
      })
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
          title="Nueva oficina"
          okText="Crear"
          cancelText="Cancelar"
          onCancel={onCancel}
          onCreate={onCreate}
        >
          <Form layout="vertical">
            <FormItem label="Pais">
              {getFieldDecorator('pais', {
                rules: [{ required: true, message: 'Selecciona el pais' }],
              })(
                <AutoComplete
                  dataSource={this.state.dataSource}
                  style={{ width: 200 }}
                  onSelect={this.onSelect}
                  onSearch={this.handleSearch}
                  placeholder="input here"
              />
              )}
            </FormItem>
            <FormItem label="Capacidad">
              {getFieldDecorator('capacidad')(<Input type="textarea" />)}
            </FormItem>
          </Form>
        </Modal>
        );
        
    }
}

const WrappedForm = Form.create()(OficinasForm);

export default WrappedForm;