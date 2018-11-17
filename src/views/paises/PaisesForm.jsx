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
      continentes: [],
    };
  }

  componentDidMount() {
      this.allContinentes();
  }

  allContinentes = () => {
    API.get('/continentes')
        .then(response => {
            this.setState({...this.state, continentes: response.data});
        })
  }

  render (){

    const { visible, onCancel, onCreate, title, action, form } = this.props;
    const { getFieldDecorator } = form;
    const { continentes } = this.state; 

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
          <FormItem label="Continente">
            {getFieldDecorator("continente", {
              rules: [{ required: true, message: "Selecciona el pais" }]
            })(
              <Select
                labelInValue={true}
              >
                {continentes.map(item => {
                  return <Option key={item.id}>{item.nombre}</Option>;
                })}
              </Select>
            )}
          </FormItem>
          <FormItem label="Nombre">
            {getFieldDecorator("nombre")(<Input type="textarea" />)}
          </FormItem>
          <FormItem label="Código">
            {getFieldDecorator("codigo")(<Input type="textarea" />)}
          </FormItem>
          <FormItem label="ISO">
            {getFieldDecorator("codigoIso")(<Input type="textarea" />)}
          </FormItem>
          <FormItem label="husoHorario">
            {getFieldDecorator("husoHorario")(<Input type="textarea" />)}
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
    this.setState({visible : true, title: 'Nuevo país', action: 'Guardar'}, () => {
      this.formRef.props.form.resetFields();
    });
  }

  editar = (id) => {
    API.get(`/paises/${id}`).then(response => {
      let data = response.data;
      this.setState({visible : true, title: 'Editar país', action: 'Actualizar'}, () => {
        this.formRef.props.form.setFields({
          id: { value: data.id },
          continente: { value: { key: data.continente.id, label: data.continente.nombre }},
          nombre: { value: data.nombre },
          codigo: { value: data.codigo },
          codigoIso: { value: data.codigoIso }
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

      API.post('paises/save', envelope)
        .then(response => {
          Notify.success({
            message: 'País actualizado'
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