import React from "react";
import { Modal, Form, Input, Select } from "antd";
import API from "../../Services/Api";
const FormItem = Form.Item;
const Option = Select.Option;

class InnerForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      paises: [],
    };
  }

  componentDidMount() {
    this.allPaises();
  }

  allPaises = () => {
    API.get("paises").then(response => {
      this.setState({ ...this.state, paises: response.data });
    });
  };

  render (){

    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { paises } = this.state; 

    return (
      <Form layout="vertical">
          <FormItem style={{display: 'none'}}>
            {getFieldDecorator("id")(<div></div>)}
          </FormItem>
          <FormItem label="País">
            {getFieldDecorator("pais", {
              rules: [{ required: true, message: "Selecciona el pais" }]
            })(
              <Select
                onSearch={this.handleSearch}
                placeholder="input here"
                labelInValue={false}
              >
                {paises.map(pais => {
                  return <Option key={pais.id}>{pais.nombre}</Option>;
                })}
              </Select>
            )}
          </FormItem>
          <FormItem label="Capacidad">
            {getFieldDecorator("capacidad")(<Input type="textarea" />)}
          </FormItem>
          <FormItem label="Código">
            {getFieldDecorator("codigo")(<Input type="textarea" />)}
          </FormItem>
        </Form>
    )
  }
}

const WrappedForm = Form.create()(InnerForm);

export default class OficinasForm extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      title: '',
      action: '',
    }
  }

  nuevo = () => {
    this.setState({visible : true, title: 'Nueva oficina', action: 'Guardar'}, () => {
      console.log(this.formRef);
    });
  }

  editar = (id) => {
    API.get(`/oficinas/${id}`).then(response => {
      let data = response.data;
      this.setState({visible : true, title: 'Editar oficina', action: 'Actualizar'}, () => {
        console.log(this.formRef);
        this.formRef.setFields({
          pais: { value: data.pais },
          codigo: { value: data.codigo },
          capacidad: { value: data.capacidad }
        });
      });
    });
  }

  close = () => {
    this.setState({visible : false});
  }

  save = () => {

  }

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    return (
      <Modal
        visible={ this.state.visible }
        title={ this.state.title }
        okText={ this.state.action }
        cancelText="Cancelar"
        onOk={ this.save }
        onCancel={this.close}
      >
        <WrappedForm ref={this.saveFormRef}/>
      </Modal>
    );
  }
}