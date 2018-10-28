import React from 'react';
import { Col, Layout, Button ,Menu,Dropdown,Icon,Modal, Upload} from 'antd';
import { TheContent, TheHeader } from '../../components/layout';
import UsuarioList from './UsuarioList';
import UsuarioForm from './UsuarioForm';

export default class Usuarios extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      cargaVisible:false

    }
  }

  showModal = () => {
    this.setState({ modalVisible: true });
  }

  handleCancel = () => {
    this.setState({ modalVisible: false });
  }

  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ modalVisible: false });
    });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  hideCarga = () => {
    this.setState({ cargaVisible: false });
  }

  subir =() =>{

  }

  showModalCarga = () => {
    this.setState({ cargaVisible: true });
  }

  render() {
    const menu = (
      <Menu>
        <Menu.Item onClick={this.showModal} key="1">Nuevo Usuario</Menu.Item>
        <Menu.Item onClick={this.showModalCarga} key="2">Cargar datos</Menu.Item>
      </Menu>
    );

    const props = {
      onRemove: (fileForm) => {
        this.setState({...this.state, fileList: []});
      },
      beforeUpload: (fileForm) => {
        this.setState({...this.state, fileList: [fileForm]});
        return false;
      },
      fileList: this.state.fileList
    };


    return (
      <Layout>
          <TheHeader>
            <Col span={12}>
              <h1> Usuarios </h1>
            </Col>
            <Col span={12} align="right">
            <Dropdown overlay={menu}>
              <Button type="primary">
                Acciones <Icon type="down" />
              </Button>
            </Dropdown>
            </Col>
          </TheHeader>
          <TheContent>
            <UsuarioList/>
            <Modal
                title="Cargar Usuarios"
                visible={this.state.cargaVisible}
                onOk={this.subir}
                onCancel={this.hideCarga}
                okText="Subir"
                cancelText="Cancelar"
              >
                 <Upload {...props}>
                  <Button>
                    Seleccionar archivo
                  </Button>
                </Upload>
            </Modal>
          </TheContent>
        </Layout>
    )
  }
}
