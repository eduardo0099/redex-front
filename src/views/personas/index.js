import React from 'react';
import { Col, Layout, Button, Modal, Upload } from 'antd';
import { TheContent, TheHeader } from '../../components/layout';
import PersonasList from './PersonasList';
import PersonasForm from './PersonasForm';
import API from '../../Services/Api';

export default class Personas extends React.Component {

    constructor(props) {
        super(props);

        this.listRef = React.createRef();
        this.formRef = React.createRef();
        this.state = {
          cargaVisible: false,
          fileList: [],
          formData: ''
        }
      }
      fetch = () => {
        this.formRef.current.fetch();
      }

      showModalCarga = () => {
        this.setState({ cargaVisible: true });
      }
    
      hideCarga = () => {
        this.setState({ cargaVisible: false });
      }
      
      subir = () => {
        API.post('personas/carga', this.state.formData)
          .then(response => {
            this.setState({...this.state, cargaVisible: false}, () => this.listRef.current.list());
        })
      }

      findDetalle = id => {
        this.formRef.current.detail(id);
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
          this.setState({...this.state, fileList: [fileForm], formData : formData});
          return false;
        },
        fileList: this.state.fileList
      };

      return (
          <Layout>
              <TheHeader>
                <Col span={12}>
                  <h1> Personas </h1>
                </Col>
                <Col span={12} align="right">
                  <Button type="primary" onClick={this.showModalCarga}> Cargar Archivo </Button>
                </Col>
              </TheHeader>
              <TheContent>
                <PersonasList ref={this.listRef} editarPersona={this.findDetalle}/>
                <PersonasForm ref={this.formRef}/>
              </TheContent>
              <Modal
                title="Cargar personas"
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