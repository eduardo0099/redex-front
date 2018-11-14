import React, { Component } from 'react';
import {Modal,Form,Input,Col,Select} from 'antd';
import API from '../../Services/Api';


const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;
class InnerForm extends React.Component {

    constructor(props){
        super(props);
        this.state={
            oficinas:[],
            roles:[],
        }
    }

    componentDidMount(){
        API.get("roles/all").then(response=>{
            this.setState({...this.state,roles:response.data});
        })
    }

    fetchOficinas=q=>{
        API.get("oficinas/search",{params:{q:q}}).then(response=>{
            this.setState({...this.state,oficinas:response.data});
        });
    };

   

    render(){
        const {visible, close,form,title,ok} = this.props;
        const  {getFieldDecorator} = form;
        console.log(this.state.roles);
        return(
            <Modal visible = {visible} title={title} onCancel={close} style={{ top: 20 }} onOk={ok}>
            <FormItem style={{display: 'none'}}>
            {getFieldDecorator("id")(<div></div>)}
            </FormItem>
            <FormItem label="Nombre">
            {getFieldDecorator("nombrePersona")(<Input type="textarea" disabled={true} />)}
            </FormItem>
            <FormItem label="Numero de documento de identidad">
            {getFieldDecorator("dni")(<Input type="textarea" disabled={true} />)}
            </FormItem>
            <InputGroup size="large"> 
                <Col span={12}><FormItem label="Rol">
                {getFieldDecorator("rol")(
                <Select 
                    style={{width:"100%"}}
                    showSearch
                    defaultActiveFirstOption={false}
                    filterOption={false}
                    notFoundContent = {null}
                    labelInValue={true}
                    >
                        {this.state.roles.map(i=>(
                            <Option key={i.id} value={i.id}>
                            {i.nombre}
                            </Option>
                        ))}
                    </Select>)}
                </FormItem></Col>
                <Col span={12}><FormItem label="Oficina">
                {getFieldDecorator("oficina")(
                <Select 
                    style={{width:"100%"}}
                    showSearch
                    defaultActiveFirstOption={false}
                    filterOption={false}
                    onSearch={this.fetchOficinas}
                    notFoundContent = {null}
                    labelInValue={true}
                    >
                        {this.state.oficinas.map(i=>(
                            <Option key={i.id} value={i.id}>
                            {i.pais.nombre}
                            </Option>
                        ))}
                    </Select>)}
                </FormItem></Col>
            </InputGroup>
            <FormItem label="Email">
            {getFieldDecorator("email")(<Input type="textarea"  />)}
            </FormItem>
            <FormItem label="Telefono">
            {getFieldDecorator("telefono")(<Input type="textarea"  />)}
            </FormItem>
            <FormItem label="Estado">
            {getFieldDecorator("estado")(<Input type="textarea" disabled={true} />)}
            </FormItem>
            </Modal>
        )
    }
}


const  WrappedForm = Form.create()(InnerForm);

export default class UsuarioDetail extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            visible: false,
            usuario:[],
            title:"Editar usuario"
        }
        this.detailRef = React.createRef();
    }

    saveFormRef = (detailRef) => {
        this.detailRef = detailRef;
    }

    close = () => {
        this.setState({ ...this.state, visible: false });
    }

    detail = id =>{
        console.log("Info del usuario",id);
        //Utilizar api para obtener informacion del usuario
        API.get(`/usuarios/${id}`).then(response=>{
            let data=response.data;
            console.log("info usuario:",data);
            this.setState({...this.state,visible:true},()=>{
                this.detailRef.props.form.setFields({
                    id:{value:data.id},
                    nombrePersona:{value:data.colaborador.persona.nombreCompleto},
                    dni:{value:data.colaborador.persona.numeroDocumentoIdentidad},
                    rol:{value:{key:data.rol.id,label:data.rol.nombre}},
                    oficina:{value:{key:data.colaborador.oficina.id,label:data.colaborador.oficina.pais.nombre}},
                    email:{value:data.colaborador.email},
                    telefono:{value:data.colaborador.telefono},
                    estado:{value:data.colaborador.estado.name},
                })
            })
        })
        
    }

    saveChange = () =>{
        //Utiliza api para guardar los cambios
 
        const form = this.detailRef.props.form;
        form.validateFields((err, values) => {
            console.log(values);
            if(err){
                return;
            }
            let usuario={id:values.id,
                rol:{id:values.rol.key},
                colaborador:{oficina:{id:values.oficina.key},email:values.email,
                            telefono:values.telefono}
            }
            API.post(`/usuarios/editar`,usuario).then(response=>{
                this.setState({ ...this.state, visible: false })
            })
        })
    }

    render(){
        return(
            <WrappedForm
                wrappedComponentRef={this.saveFormRef}
                visible={this.state.visible}
                close={this.close}
                ok={this.saveChange}
                title={this.state.title}
                action={this.state.action}
                usuario={this.state.usuario}
            />

        )
    }
}