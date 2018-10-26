import React from 'react';
import { Col, Layout, Button, Menu, Dropdown, Icon, Modal, Upload,Input} from 'antd';
import { TheContent, TheHeader } from '../../components/layout';
import PaquetesList from './PaquetesList';
import PaquetesDetail from './PaquetesDetail';
import API from '../../Services/Api';

const Search = Input.Search;

export default class Paquetes extends React.Component {

  constructor(props) {
    super(props);

    this.listRef = React.createRef();

    this.state = {
      archivo: '',
      cargaVisible: false,
      detalleVisible:false,
      fileList: []
    }
  }

  showModal = () => {
    this.setState({ detalleVisible: true });
  }

  handleCancel = () => {
    this.setState({ detalleVisible: false });
  }

  showModalCarga = () => {
    this.setState({ cargaVisible: true });
  }


  hideCarga = () => {
    this.setState({ cargaVisible: false });
  }

  subir = () => {
    //API.post('oficinas/carga', this.state.formData)
    //.then(response => {
    //  this.setState({...this.state, cargaVisible: false}, () => this.listRef.current.list());
    //})
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

  gotoNuevo = () => {
    this.props.route.history.push('/paquetes/Nuevo');
  }

  render() {
    const menu = (
      <Menu>
        <Menu.Item onClick={this.gotoNuevo} key="1">Nuevo Paquete</Menu.Item>
        <Menu.Item onClick={this.showModalCarga} key="2">Cargar datos</Menu.Item>
      </Menu>
    );

    const props = {
      onRemove: (fileForm) => {
        this.setState({...this.state, fileList: [], formData: ''});
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

    const docI = (
            <Menu >
              <Menu.Item key="1"><Icon type="user" />DNI</Menu.Item>
              <Menu.Item key="2"><Icon type="user" />Pasaporte</Menu.Item>
            </Menu>
    );

    return (
        <Layout>
          <TheHeader>
            <Col span={12}>
              <h1> Paquetes </h1>
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
              <Col span={5}>
                <Dropdown.Button   overlay={docI}>
                  Tipo de Documento
                </Dropdown.Button>
                </Col>
              <Col span={6}>
              <Search
              placeholder="Ingresar documento del cliente"
              onSearch={value => console.log(value)}
              enterButton
              />
              </Col>
              <br /><br />
              <PaquetesList ref={this.listRef}/>
              <PaquetesDetail visible={this.state.detalleVisible} onCancel={this.handleCancel} onCreate={this.handleCreate} wrappedComponentRef={this.saveFormRef}/>
              <Modal
                title="Cargar Paquetes"
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

