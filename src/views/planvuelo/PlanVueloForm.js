import React from "react";
import { Modal, Form, Input, Select } from "antd";
import API from "../../Services/Api";
import Notify from "../../utils/notify";
const FormItem = Form.Item;
const Option = Select.Option;

class InnerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oficinasOrigen: [],
      oficinasDestino: []
    };
  }

  fetchOficinasDestino = q => {
    API.get("oficinas/search", { params: { q: q } }).then(response => {
      this.setState({ ...this.state, oficinasDestino: response.data });
    });
  };

  fetchOficinasOrigen = q => {
    API.get("oficinas/search", { params: { q: q } }).then(response => {
      this.setState({ ...this.state, oficinasOrigen: response.data });
    });
  };

  render() {
    const { visible, onCancel, onCreate, title, action, form } = this.props;
    const { getFieldDecorator } = form;

    const optionsPaisesDestino = this.state.oficinasDestino.map(i => (
      <Option key={i.id} value={i.id}>
        {i.pais.nombre}
      </Option>
    ));

    const optionsPaisesOrigen = this.state.oficinasOrigen.map(i => (
      <Option key={i.id} value={i.id}>
        {i.pais.nombre}
      </Option>
    ));
    return (
      <Modal
        visible={visible}
        title={title}
        okText={action}
        cancelText="Cancelar"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical">
          <FormItem style={{ display: "none" }}>
            {getFieldDecorator("planVuelo.id")(<div />)}
          </FormItem>
          <FormItem style={{ display: "none" }}>
            {getFieldDecorator("id")(<div />)}
          </FormItem>
          <FormItem label="Origen">
            {getFieldDecorator("oficinaOrigen", {
              rules: [{ required: true, message: "Selecciona el país" }]
            })(
              <Select
                showSearch
                defaultActiveFirstOption={false}
                filterOption={false}
                onSearch={this.fetchOficinasOrigen}
                notFoundContent={null}
                labelInValue={true}
              >
                {optionsPaisesOrigen}
              </Select>
            )}
          </FormItem>
          <FormItem label="Destino">
            {getFieldDecorator("oficinaDestino", {
              rules: [{ required: true, message: "Selecciona el país" }]
            })(
              <Select
                showSearch
                defaultActiveFirstOption={false}
                filterOption={false}
                onSearch={this.fetchOficinasDestino}
                notFoundContent={null}
                labelInValue={true}
              >
                {optionsPaisesDestino}
              </Select>
            )}
          </FormItem>
          <FormItem label="Hora inicio">
            {getFieldDecorator("horaInicio")(<Input type="textarea" />)}
          </FormItem>
          <FormItem label="Hora fin">
            {getFieldDecorator("horaFin")(<Input type="textarea" />)}
          </FormItem>
          <FormItem label="Capacidad">
            {getFieldDecorator("capacidad")(<Input type="textarea" />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

const WrappedForm = Form.create()(InnerForm);

export default class OficinasForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      title: "",
      action: ""
    };
  }

  nuevo = () => {
    this.setState(
      { visible: true, title: "Nuevo vuelo", action: "Guardar" },
      () => {
        this.formRef.props.form.resetFields();
      }
    );
  };

  editar = id => {
    API.get(`/vuelos/${id}`).then(response => {
      let data = response.data;
      this.setState(
        { visible: true, title: "Editar vuelo", action: "Actualizar" },
        () => {
          this.formRef.props.form.setFields({
            id: {
              value: data.id
            },
            "planVuelo.id": {
              value: data.planVuelo.id
            },
            "oficinaOrigen": {
              value: {
                key: data.oficinaOrigen.id,
                label: data.oficinaOrigen.pais.nombre
              }
            },
            "oficinaDestino": {
              value: {
                key: data.oficinaDestino.id,
                label: data.oficinaDestino.pais.nombre
              }
            },
            horaInicio: { value: data.horaInicioString },
            horaFin: { value: data.horaFinString },
            capacidad: { value: data.capacidad }
          });
        }
      );
    });
  };

  close = () => {
    this.setState({ visible: false });
  };

  save = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      console.log('Formulario: ', values);

      if (err) {
        return;
      }

      let envelope = {
        ...values,
        oficinaDestino: {id: values.oficinaDestino.key},
        oficinaOrigen: {id: values.oficinaOrigen.key},
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
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

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
    );
  }
}
