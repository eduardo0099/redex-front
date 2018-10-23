import React from 'react';
import { Col, Layout, Button, Modal, Upload} from 'antd';
import { TheContent, TheHeader } from '../../components/layout';
import PlanVueloList from './PlanVueloList';
import PlanVueloForm from './PlanVueloForm';
import API from '../../Services/Api';

export default class PlanVuelo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      archivo: '',
      cargaVisible: true
    }
  }

  showModalCarga = () => {
    this.setState({ cargaVisible: true });
  }

  hideCarga = () => {
    this.setState({ cargaVisible: false });
  }
  
  subir = () => {
    API.post('vuelos/carga', this.state.archivo)
    .then(response => {
      window.location.reload();
    })
   
  }

  render() {

    const props = {
      onRemove: (fileForm) => {
        this.setState({...this.state, fileList: []});
      },
      beforeUpload: (fileForm) => {
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
          <h1> Plan de Vuelo </h1>
        </Col>
        <Col span={12} align="right">
          <Button type="primary" onClick={this.showModalCarga}> Cargar Archivo </Button>
        </Col>
      </TheHeader>
      <TheContent>
          <PlanVueloList/>
          <PlanVueloForm visible={this.state.modalVisible} onCancel={this.handleCancel} onCreate={this.handleCreate} wrappedComponentRef={this.saveFormRef}/>
      </TheContent>
      <Modal
                title="Cargar plan de vuelo"
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
    </Layout>
    )
  }
}
