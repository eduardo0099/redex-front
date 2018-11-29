import React from 'react';
import { Col, Layout, Button, Modal, Upload } from 'antd';
import { TheContent, TheHeader } from '../../components/layout';
import PersonasList from './PersonasList';
import PersonasForm from './PersonasForm';
import API from '../../Services/Api';
import notify from '../../utils/notify';

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
        this.listRef.current.fetch();
      }

      showModalCarga = () => {
        this.setState({ cargaVisible: true });
      }
    
      hideCarga = () => {
        this.setState({ cargaVisible: false });
      }
      
      subir = () => {
        if(this.state.formData == ''){
          notify.warning({
            message: 'No se seleccionó ningún archivo'
          });
        }
        else{
          API.post('personas/carga', this.state.formData).then(response => {
              this.setState({...this.state, cargaVisible: false}, () => this.listRef.current.list());
              notify.success({
                message: 'Se cargo correctamente el archivo de personas'
              });
          }).catch((error)=>{
            notify.success({
              message: 'No se pudo cargar el archivo de personas'
            });
          })
        }
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
                <PersonasForm ref={this.formRef} fetch={this.fetch}/>
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
                 <h3>Para añadir datos en masa, seleccione un archivo txt que contenga la información que desea cargar.</h3>
                  <Button>
                    Seleccionar archivo
                  </Button>
                </Upload>
              </Modal>
            </Layout>
      )
    }

} 