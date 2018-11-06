import React from 'react';
import { Divider ,Col, Layout, Button,Form, Input,AutoComplete,Select,Icon,Menu,message,Modal,Switch,Tooltip} from 'antd';
import { TheContent, TheHeader } from '../../components/layout';
import PaquetesCliente from './PaquetesCliente';
import API from '../../Services/Api';
import Notify from "../../utils/notify";

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
            tipoDoc:[],
            paises:[{id:"1",nombre:"Peru"},{id:"2",nombre:"Dinamarca"}],
            oficinasOrigen:[],
            oficinasDestino:[],

        }
    }

    componentDidMount(){
        API.get('/tipodocidentidad').then(response=>{
            this.setState({...this.state,
              tipoDoc:response.data
            })
          })
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
        const {form, findPersonaDestino,findPersonaOrigen,showModalRegistroOrigen,showModalRegistroDestino}=this.props;
        const  {getFieldDecorator} = form;

        return(
            <Form layout="vertical">
                <FormItem style={{ display: "none" }}>
                {getFieldDecorator("personaOrigen.id")(<div />)}
                </FormItem>
                <FormItem style={{ display: "none" }}>
                {getFieldDecorator("personaDestino.id")(<div />)}
                </FormItem>
                <Divider orientation="left">Origen</Divider>
                <InputGroup size="large"> 
                    <Col span={4}>
                    <FormItem label="Pais">
                    </FormItem>
                    </Col>
                    <Col span={5}>
                    <FormItem>
                    {getFieldDecorator("oficinaOrigen",{
                    rules: [{ required: true, message: 'Porfavor ingrese la oficina origen' }],
                    })(
                    <Select 
                    style={{width:"100%"}}
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
                    )}</FormItem>
                    </Col>
                </InputGroup>
                <InputGroup size="large"> 
                    <Col span={4}>
                    <FormItem label="Persona">
                    </FormItem>
                    </Col>
                    <Col span={5}>
                    <FormItem >
                    {getFieldDecorator("tipoDocumentoIdentidadOrigen",{
                    rules: [{ required: true, message: 'Porfavor ingrese el tipo de documento' }],
                    })(
                    <Select labelInValue={true} style={{width:"100%"}}>
                        {this.state.tipoDoc.map(i=>(
                            <Option key={i.id} value={i.id}>
                            {i.simbolo}
                            </Option>
                        ))}
                    </Select>
                    )}
                    </FormItem>
                    </Col>
                    <Col span={5}>
                    <FormItem>
                    {getFieldDecorator("numeroDocumentoOrigen",{
                    rules: [{ required: true, message: 'Porfavor ingrese el numero documento' }],
                    })(<Input type="textarea" />)}
                    </FormItem>
                    </Col>
                    <Col span={1}>
                    <FormItem >
                        <Tooltip placement="top" title={"Buscar cliente"}>
                        <Button type="primary" shape="circle" icon="search" onClick={findPersonaOrigen} />
                        </Tooltip>
                    </FormItem>
                    </Col>
                    <Col span={1}>
                    <FormItem >
                        <Tooltip placement="top" title={"Añadir nuevo cliente"}>
                        <Button type="primary" shape="circle" icon="plus" onClick={showModalRegistroOrigen}/>
                        </Tooltip>
                    </FormItem>
                    </Col>
                </InputGroup>
                <InputGroup size="large">
                    <Col span={4}>
                    </Col>
                    <Col span={10}>
                    <FormItem >
                    {getFieldDecorator("nombreClienteOrigen")(<Input type="textarea" disabled={true} />)}
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
                    {getFieldDecorator("oficinaDestino",{
                    rules: [{ required: true, message: 'Porfavor ingrese la oficina de destino' }],
                    })(
                    <Select 
                    style={{width:"100%"}}
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
                    )}</FormItem>
                    </Col>
                </InputGroup>
                <InputGroup size="large"> 
                    <Col span={4}>
                    <FormItem label="Persona">
                    </FormItem>
                    </Col>
                    <Col span={5}>
                    <FormItem >
                    {getFieldDecorator("tipoDocumentoIdentidadDestino",{
                    rules: [{ required: true, message: 'Porfavor ingrese el tipo de documento' }],
                    })(
                    <Select labelInValue={true} style={{width:"100%"}}>
                        {this.state.tipoDoc.map(i=>(
                            <Option key={i.id} value={i.id}>
                            {i.simbolo}
                            </Option>
                        ))}
                    </Select>
                    )}</FormItem>
                    </Col>
                    <Col span={5}>
                    <FormItem>
                    {getFieldDecorator("numeroDocumentoDestino",{
                    rules: [{ required: true, message: 'Porfavor ingrese numero de documento' }],
                    })(<Input type="textarea" />)}
                    </FormItem>
                    </Col>
                    <Col span={1}>
                    <FormItem >
                        <Tooltip placement="top" title={"Buscar cliente"}>
                        <Button type="primary" shape="circle" icon="search" onClick={findPersonaDestino}/>
                        </Tooltip>
                    </FormItem>
                    </Col>
                    <Col span={1}>
                    <FormItem >
                        <Tooltip placement="top" title={"Añadir nuevo cliente"}>
                        <Button type="primary" shape="circle" icon="plus" onClick={showModalRegistroDestino}/>
                        </Tooltip>
                    </FormItem>
                    </Col>
                </InputGroup>
                <InputGroup size="large">
                    <Col span={4}>
                    </Col>
                    <Col span={10}>
                    <FormItem >
                    {getFieldDecorator("nombreClienteDestino")(<Input type="textarea" disabled={true} />)}
                    </FormItem>
                    </Col>
                </InputGroup>
                <Divider orientation="left">Opciones de Notificaciones</Divider>
                    <InputGroup size="large">
                    <Col span={2}><FormItem>
                    {getFieldDecorator("notiRegistro")(
                        <Switch  checkedChildren="Si" unCheckedChildren="No"/>
                    )}</FormItem></Col>
                        <Col span={10}><FormItem label="Notificar registro del paquete"></FormItem></Col>
                        <Col span={2}><FormItem>
                    {getFieldDecorator("notiAbordados")(
                        <Switch checkedChildren="Si" unCheckedChildren="No"/>
                    )}</FormItem></Col>
                        <Col span={10}><FormItem label="Notificar llegada a destino del paquete"></FormItem></Col>
                    </InputGroup>
                    <InputGroup size="large">
                        <Col span={2}><FormItem>
                        {getFieldDecorator("notiLlegada")(
                            <Switch checkedChildren="Si" unCheckedChildren="No"/>
                        )}</FormItem></Col>
                        <Col span={10}><FormItem label="Notificar vuelos abordados por el paquete"></FormItem></Col>
                    </InputGroup>
               
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
            modalRegistroOrigen:false,
            modalRegistroDestino:false,
            modalResumen:false,
            id:"",

        }
    }
    //Guardar button
    showModalResumen = () =>{   
        const form = this.formRef.props.form;
        form.validateFields(["oficinaDestino","oficinaOrigen","tipoDocumentoIdentidadOrigen","numeroDocumentoOrigen","tipoDocumentoIdentidadDestino","numeroDocumentoDestino"],(err, values) => {
            if(err){
                return;
            }
            this.setState({ modalResumen: true });
        })
    }
    handleCancelResumen = ()=>{
        this.setState({ modalResumen: false });
    }
    handleCreateResumen =() =>{
        
        this.setState({ modalResumen: false });
    }
    //Plus button Origen
    showModalRegistroOrigen = () =>{
        this.setState({ modalRegistroOrigen: true });
    };
    handleCancelOrigen = ()=>{
        this.setState({ modalRegistroOrigen: false });
    };

    //Plus button Destino
    showModalRegistroDestino = () =>{
        this.setState({ modalRegistroDestino: true });
    };
    handleCancelDestino = ()=>{
        this.setState({ modalRegistroDestino: false });
    };
    

    findPersonaOrigen = () => {
        const form = this.formRef.props.form;
        form.validateFields(["tipoDocumentoIdentidadOrigen","numeroDocumentoOrigen"],(err, values) => {
            console.log(values)
            if(err){
                return;
            }
            let envelope =  {
                tipoDocumentoIdentidad: {
                    id: values.tipoDocumentoIdentidadOrigen.key
                },
                numeroDocumentoIdentidad: values.numeroDocumentoOrigen
            }
            API.post(`/personas/find`, envelope)
                .then(response => {
                    let data = response.data;
                    this.formRef.props.form.setFields({
                        nombreClienteOrigen: {
                            value:data.nombreCompleto
                        },
                        "personaOrigen.id": {
                            value:data.id
                        }
                    });
                })
        })
    }
    
    findPersonaDestino = ()=>{
        const form = this.formRef.props.form;
        form.validateFields(["tipoDocumentoIdentidadDestino","numeroDocumentoDestino"],(err, values) => {
            console.log(values)
            if(err){
                return;
            }
            API.post(`/personas/find`,
                {
                tipoDocumentoIdentidad:{id:values.tipoDocumentoIdentidadDestino.key},
                numeroDocumentoIdentidad:values.numeroDocumentoDestino
            })
        .then(response => {
            let data = response.data;
                this.formRef.props.form.setFields({
                    nombreClienteDestino:{
                        value:data.nombreCompleto
                    },
                    "personaDestino.id":{
                        value:data.id
                    }
                });
              }
            )
          })
    }

    save = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
          console.log('Formulario: ', values);
          if (err) {
            return;
          }
          //el bloque que se manda al back
          let envelope = {
            personaOrigen:{id:values.personaOrigen.id},
            personaDestino:{id:values.personaDestino.id},
            oficinaOrigen:{id:values.oficinaOrigen.key},
            oficinaDestino:{id:values.oficinaDestino.key},
            "notiRegistro":values.notiRegistro,
            "notiAbordados":values.notiAbordados,
            "notiLlegada":values.notiLlegada
          }
          API.post('paquetes/save', envelope)
            .then(response => {
                console.log('Formulario final',envelope)
              Notify.success({
                message: 'Paquete registrado'
              });
            this.setState({ modalResumen: false });

              form.resetFields();
              //this.props.fetch();
              this.handleCancel();
            })
        }); 
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
    };
    //Cliente Nuevo
    saveFormRefClienteOrigen = formRef => {
        this.formRefClienteOrigen = formRef;
    };

    saveFormRefClienteDestino = formRef => {
        this.formRefClienteDestino = formRef;
    };

    handleCreateOrigen = () => {
        const form = this.formRefClienteOrigen.props.form;
        form.validateFields(["idDocumento","docIdentidad","nombres","apPaterno","apMaterno","telefono","correoElectronico"],(err,values)=>{
            console.log(values);
            if(err){
                return
            }
            API.post('personas/save',values).then(response =>{
                this.formRef.setFields()
            })
            
        })
        
    };

    handleCreateDestino = () => {
        const form = this.formRefClienteDestino.props.form;
        form.validateFields(["idDocumento","docIdentidad","nombres","apPaterno","apMaterno","telefono","correoElectronico"],(err,values)=>{
            console.log(values);
            if(err){
                return;
            }
            API.post('personas/save',{...values,idDocumento:values.idDocumento.key}).then(response =>{
                this.formRef.setFields()
            })
            
        })
        
    };

    render(){
        return(
            <Layout>
            <TheHeader>
                <Col span={10}>
                <h1> Paquete Nuevo </h1>
                </Col>
            </TheHeader>
            <TheContent>
            <PaquetesCliente
            visible={this.state.modalRegistroOrigen}
            onCancel={this.handleCancelOrigen}
            onOk={this.handleCreateOrigen}
            wrappedComponentRef={this.saveFormRefClienteOrigen}
            />
            <PaquetesCliente
            visible={this.state.modalRegistroDestino}
            onCancel={this.handleCancelDestino}
            onOk={this.handleCreateDestino}
            wrappedComponentRef={this.saveFormRefClienteDestino}
            />
            <WrappedForm
            wrappedComponentRef = {this.saveFormRef} 
            findPersonaDestino = {this.findPersonaDestino}
            findPersonaOrigen = {this.findPersonaOrigen}
            showModalRegistroOrigen = {this.showModalRegistroOrigen}
            showModalRegistroDestino={this.showModalRegistroDestino}
            />
            <Divider ></Divider>
            <Col span={2} align="right"><Button type="primary" onClick={this.showModalResumen}>Guardar</Button></Col>
            <Col span={-2} align="right"><Button >Cancelar</Button></Col>
            <Modal
            visible = {this.state.modalResumen}
            onCancel={this.handleCancelResumen}
            onOk={this.save}
            title="Resumen de Registro de paquete"
            okText="ok"
            cancelText="Cancelar"
            >
            <Divider orientation="left">Origen</Divider>
            <span>Cliente:</span>
            <span>Pais:</span>
            <Divider orientation="left">Destino</Divider>
            <span>Cliente:</span>
            <span>Pais:</span>
            <Divider orientation="left">Notificaciones</Divider>
            <span>Notificacion Registro:</span>
            <span>Notificacion LLegada:</span>
            <span>Notificacion Abordados:</span>
            </Modal>
            </TheContent>
            </Layout>
        )
    }
    
}