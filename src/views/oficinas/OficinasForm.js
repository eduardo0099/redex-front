import React from "react";
import { Modal, Form, Input, Select } from "antd";
import API from "../../Services/Api";
import Notify from '../../utils/notify';

const FormItem = Form.Item;
const Option = Select.Option;

class InnerForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      paises: [],
    };
  }

  fetchPaises = q => {
    API.get("paises/search", { params: { q: q } }).then(response => {
      this.setState({ ...this.state, paises: response.data });
    });
  };

  render (){

    const { visible, onCancel, onCreate, title, action, form } = this.props;
    const { getFieldDecorator } = form;
    const { paises } = this.state; 

    return (
      <Modal
          visible={visible}
          title={ title }
          okText={ action }
          cancelText="Cancelar"
          onCancel={onCancel}
          onOk={onCreate}
        >
      <Form layout="vertical">
          <FormItem style={{display: 'none'}}>
            {getFieldDecorator("id")(<div></div>)}
          </FormItem>
          <FormItem label="País">
            {getFieldDecorator("pais", {
              rules: [{ required: true, message: "Selecciona el pais" }]
            })(
              <Select
                showSearch
                defaultActiveFirstOption={false}
                filterOption={false}
                onSearch={this.fetchPaises}
                notFoundContent={null}
                labelInValue={true}
              >
                {paises.map(pais => {
                  return <Option key={pais.id}>{pais.nombre}</Option>;
                })}
              </Select>
            )}
          </FormItem>
          <FormItem label="Capacidad">
            {getFieldDecorator("capacidadMaxima")(<Input type="textarea" />)}
          </FormItem>
          <FormItem label="Código">
            {getFieldDecorator("codigo")(<Input type="textarea" />)}
          </FormItem>
        </Form>
        </Modal>
    )
  }
}

const WrappedForm = Form.create()(InnerForm);

export default class OficinasForm extends React.PureComponent {
  
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
      this.formRef.props.form.resetFields();
    });
  }

  editar = (id) => {
    API.get(`/oficinas/${id}`).then(response => {
      let data = response.data;
      this.setState({visible : true, title: 'Editar oficina', action: 'Actualizar'}, () => {
        this.formRef.props.form.setFields({
          id: { value: data.id },
          pais: { value: { key: data.pais.id, label: data.pais.nombre }},
          codigo: { value: data.codigo },
          capacidadMaxima: { value: data.capacidadMaxima }
        });
      });
    });
  }

  close = () => {
    this.setState({visible : false});
  }

  save = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      let envelope = {
        ...values,
        pais: {id: values.pais.key},
      }

      API.post('vuelos/save', envelope)
        .then(response => {
          Notify.success({
            message: 'Oficina actualizada'
          });
          form.resetFields();
          this.props.fetch();
          this.close();
        })
      
    }); 
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  render() {
    return (
      <WrappedForm
        wrappedComponentRef={this.saveFormRef}
        visible={this.state.visible}
        onCancel={this.close}
        onCreate={this.save}
        title={this.state.title}
        action={this.state.action}
      />
    )
  }
}