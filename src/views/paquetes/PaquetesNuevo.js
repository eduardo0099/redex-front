import React from 'react';
import { Divider ,Col, Layout, Button,Form, Input,AutoComplete,Select,Icon,Menu,message,Modal,Switch,Tooltip} from 'antd';
import { TheContent, TheHeader } from '../../components/layout';
import PaquetesCliente from './PaquetesCliente';
import API from '../../Services/Api';

const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;

function onSelect(value) {
    console.log('onSelect', value);
  }

  function handleButtonClick(e) {
    message.info('Click on left button.');
    console.log('click left button', e);
  }
  
  function handleMenuClick(e) {
    message.info('Click on menu item.');
    console.log('click', e);
  }

class InnerForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            tipoDoc:[{id:"1",nombre:"DNI"},{id:"2",nombre:"Pasaporte"}],
            paises:[{id:"1",nombre:"Peru"},{id:"2",nombre:"Dinamarca"}],
            oficinasOrigen:[],
            oficinasDestino:[]
        }
    }

    fetchOficinasOrigen=q=>{
         API.get("oficinas/search",{params:{q:q}}).then(response=>{
             this.setState({...this.state,oficinasOrigen:response.data});
         });
    };

    fetchOficinasDestino=q=>{
        API.get("oficinas/search",{params:{q:q}}).then(response=>{
            this.setState({...this.state,oficinasDestino:response.data});
        });
   };

    render(){
        const {form}=this.props;
        const  {getFieldDecorator} = form;

        return(
            <Form layout="vertical">
                <Divider orientation="left">Origen</Divider>
                <InputGroup size="large"> 
                    <Col span={4}>
                    <FormItem label="Pais">
                    </FormItem>
                    </Col>
                    <Col span={5}>
                    <FormItem>
                    <Select 
                    showSearch
                    defaultActiveFirstOption={false}
                    filterOption={false}
                    onSearch={this.fetchOficinasOrigen}
                    notFoundContent = {null}
                    labelInValue={true}
                    >
                        {this.state.oficinasOrigen.map(i=>(
                            <Option key={i.id} value={i.id}>
                            {i.pais.nombre}
                            </Option>
                        ))}
                    </Select>
                    </FormItem>
                    </Col>
                </InputGroup>
                <InputGroup size="large"> 
                    <Col span={4}>
                    <FormItem label="Persona">
                    </FormItem>
                    </Col>
                    <Col span={5}>
                    <FormItem >
                    {getFieldDecorator("tipoDocumentoIdentidadOrigen")(
                    <Select labelInValue={true}>
                        {this.state.tipoDoc.map(i=>(
                            <Option key={i.id} value={i.id}>
                            {i.nombre}
                            </Option>
                        ))}
                    </Select>
                    )}
                    </FormItem>
                    </Col>
                    <Col span={5}>
                    <FormItem>
                    {getFieldDecorator("numeroDocumentoIdentidadOrigen")(<Input type="textarea" />)}
                    </FormItem>
                    </Col>
                    <Col span={1}>
                    <FormItem >
                        <Tooltip placement="top" title={"Buscar cliente"}>
                        <Button type="primary" shape="circle" icon="search" />
                        </Tooltip>
                    </FormItem>
                    </Col>
                    <Col span={1}>
                    <FormItem >
                        <Tooltip placement="top" title={"Añadir nuevo cliente"}>
                        <Button type="primary" shape="circle" icon="plus" onClick={this.showModalRegistro}/>
                        </Tooltip>
                    </FormItem>
                    </Col>
                </InputGroup>
                <InputGroup size="large">
                    <Col span={4}>
                    </Col>
                    <Col span={10}>
                    <FormItem >
                        <Input disabled={true}></Input>
                    </FormItem>
                    </Col>
                </InputGroup>
                <Divider orientation="left">Destino</Divider>
                <InputGroup size="large"> 
                    <Col span={4}>
                    <FormItem label="Pais">
                    </FormItem>
                    </Col>
                    <Col span={5}>
                    <FormItem>
                    <Select 
                    showSearch
                    defaultActiveFirstOption={false}
                    filterOption={false}
                    onSearch={this.fetchOficinasDestino}
                    notFoundContent = {null}
                    labelInValue={true}
                    >
                        {this.state.oficinasDestino.map(i=>(
                            <Option key={i.id} value={i.id}>
                            {i.pais.nombre}
                            </Option>
                        ))}
                    </Select>
                    </FormItem>
                    </Col>
                    <Col span={5}>
                    <FormItem >
                        <Input disabled={true}></Input>
                    </FormItem>
                    </Col>
                </InputGroup>
                <InputGroup size="large"> 
                    <Col span={4}>
                    <FormItem label="Persona">
                    </FormItem>
                    </Col>
                    <Col span={5}>
                    <Select>
                        {this.state.tipoDoc.map(i=>(
                            <Option key={i.id} value={i.id}>
                            {i.nombre}
                            </Option>
                        ))}
                    </Select>
                    </Col>
                    <Col span={5}>
                    <FormItem>
                        <Input placeholder="N° Documento"></Input>
                    </FormItem>
                    </Col>
                    <Col span={1}>
                    <FormItem >
                        <Tooltip placement="top" title={"Buscar cliente"}>
                        <Button type="primary" shape="circle" icon="search" />
                        </Tooltip>
                    </FormItem>
                    </Col>
                    <Col span={1}>
                    <FormItem >
                        <Tooltip placement="top" title={"Añadir nuevo cliente"}>
                        <Button type="primary" shape="circle" icon="plus" onClick={this.showModalRegistro}/>
                        </Tooltip>
                    </FormItem>
                    </Col>
                </InputGroup>
                <InputGroup size="large">
                    <Col span={4}>
                    </Col>
                    <Col span={10}>
                    <FormItem >
                        <Input disabled={true}></Input>
                    </FormItem>
                    </Col>
                </InputGroup>
                <Divider orientation="left">Opciones de Notificaciones</Divider>
                    <InputGroup size="large">
                        <Col span={2}><Switch  checkedChildren="Si" unCheckedChildren="No"/></Col>
                        <Col span={10}><FormItem label="Notificar registro del paquete"></FormItem></Col>
                        <Col span={2}><Switch checkedChildren="Si" unCheckedChildren="No"/></Col>
                        <Col span={10}><FormItem label="Notificar llegada a destino del paquete"></FormItem></Col>
                    </InputGroup>
                    <InputGroup size="large">
                        <Col span={2}><Switch checkedChildren="Si" unCheckedChildren="No"/></Col>
                        <Col span={10}><FormItem label="Notificar vuelos abordados por el paquete"></FormItem></Col>
                    </InputGroup>
                <Divider ></Divider>
                <Col span={2} align="right"><Button type="primary" onClick={this.showModalResumen}>Guardar</Button></Col>
                <Col span={-2} align="right"><Button >Cancelar</Button></Col>
            </Form>

        )
    }
}

const WrappedForm = Form.create()(InnerForm);

export default class PaquetesNuevo extends React.Component {

    constructor(props){
        super(props);
        this.state={
            dataSource: [],
            modalRegistro:false,
            modalResumen:false
        }
    }
    //Guardar button
    showModalResumen = () =>{
        this.setState({ modalResumen: true });
    }
    handleCancelResumen = ()=>{
        this.setState({ modalResumen: false });
    }
    handleCreateResumen =() =>{
        
        this.setState({ modalResumen: false });
    }
    //Plus button
    showModalRegistro = () =>{
        this.setState({ modalRegistro: true });
    };
    handleCancel = ()=>{
        this.setState({ modalRegistro: false });
    };
    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
          if (err) {
            return;
          }
          form.resetFields();
          this.setState({ modalRegistro: false });
        });
    };
    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    render(){
        const menu = (
            <Menu onClick={handleMenuClick}>
              <Menu.Item key="1"><Icon type="user" />DNI</Menu.Item>
              <Menu.Item key="2"><Icon type="user" />Pasaporte</Menu.Item>
            </Menu>
        );
        
        
        return(
            <Layout>
            <TheHeader>
                <Col span={10}>
                <h1> Paquete Nuevo </h1>
                </Col>
            </TheHeader>
            <TheContent>
            <PaquetesCliente
            visible={this.state.modalRegistro}
            onCancel={this.handleCancel}
            onOk={this.handleCreate}
            wrappedComponentRef={this.saveFormRef}
            />
            <WrappedForm
            wrappedComponentRef = {this.saveFormRef}
            />
            <Modal
            visible = {this.state.modalResumen}
            onCancel={this.handleCancelResumen}
            onOk={this.handleCreateResumen}
            title="Resumen de Registro de paquete"
            okText="ok"
            cancelText="Cancelar"
            ></Modal>
            </TheContent>
            </Layout>
        )
    }
    
}