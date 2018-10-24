import React from 'react';
import { Col, Layout, Button, Menu, Dropdown, Icon, Modal, Upload} from 'antd';
import { TheContent, TheHeader } from '../../components/layout';
import OficinasList from './OficinasList';
import OficinasForm from './OficinasForm';
import API from '../../Services/Api';

export default class Oficinas extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      archivo: '',
      modalVisible: false,
      cargaVisible: false,
      fileList: []
    }
  }

  showModal = () => {
    this.setState({ modalVisible: true });
  }

  showModalCarga = () => {
    this.setState({ cargaVisible: true });
  }


  hideCarga = () => {
    this.setState({ cargaVisible: false });
  }

  handleCancel = () => {
    this.setState({ modalVisible: false });
  }
   
  subir = () => {
    API.post('oficinas/carga', this.state.archivo)
    .then(response => {
      window.location.reload();
    })
   
  }

  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      form.resetFields();
      this.setState({ modalVisible: false });
    });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  render() {

    const menu = (
      <Menu>
        <Menu.Item onClick={this.showModal} key="1">Nueva Oficina</Menu.Item>
        <Menu.Item onClick={this.showModalCarga} key="2">Cargar datos</Menu.Item>
      </Menu>
    );

    const props = {
      onRemove: (fileForm) => {
        this.setState({...this.state, fileList: []});
      },
      beforeUpload: (fileForm) => {
        this.setState({...this.state, fileList: [fileForm]});
        let file =  fileForm;
        let formData = new FormData();
        formData.append('file', file);
        API.post('archivos/upload', formData)
        .then(response => {
          this.setState({...this.state, archivo: response.data});
        })
        return false;
      },
      fileList: this.state.fileList
    };

    return (
        <Layout>
          <TheHeader>
            <Col span={12}>
              <h1> Oficinas </h1>
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
              <OficinasList/>
              <OficinasForm visible={this.state.modalVisible} onCancel={this.handleCancel} onCreate={this.handleCreate} wrappedComponentRef={this.saveFormRef}/>
              <Modal
                title="Cargar oficinas"
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

