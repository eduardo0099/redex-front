import React from "react";
import { Layout } from "antd";
import { TheContent, TheHeader } from "../../components/layout";
import API from "../../Services/Api";
import notify from '../../utils/notify';
import RolesList from "./RolesList";

export default class Roles extends React.Component {
  constructor(props) {
    super(props);

    this.listRef = React.createRef();

    this.state = {
      archivo: "",
      modalVisible: false,
      cargaVisible: false,
      fileList: []
    };
  }

  showModal = () => {
    this.setState({ modalVisible: true });
  };

  showModalCarga = () => {
    this.setState({ cargaVisible: true });
  };

  hideCarga = () => {
    this.setState({ cargaVisible: false });
  };

  handleCancel = () => {
    this.setState({ modalVisible: false });
  };

  subir = () => {
    API.post("oficinas/carga", this.state.formData)
      .then(response => {
        notify.success({
          message: 'Carga finalizada',
          description: `${response.data.cantidadRegistros} registros agregados`
        })
        this.setState({ ...this.state, cargaVisible: false }, () =>
          this.listRef.current.list()
        );
      });
  };

  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      form.resetFields();
      this.setState({ modalVisible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    return (
      <Layout>
        <TheHeader>
            <h1> Roles </h1>
        </TheHeader>
        <TheContent>
          <RolesList ref={this.listRef} />
        </TheContent>
      </Layout>
    );
  }
}
