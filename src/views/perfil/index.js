import React, { Component } from "react";
import { Layout, Row, Col,Button,Form,Input,Icon,Tooltip,Modal } from "antd";
import { TheContent, TheHeader } from "../../components/layout";
import API from "../../Services/Api";
import WrappedForm from "./CambioContrasenha";
import Notify from '../../utils/notify';

const FormItem = Form.Item;
const InputGroup = Input.Group;

class Perfil extends Component {
    constructor(props){
        super(props)
        this.cambioRef = React.createRef();
        this.state={
            info:{
                persona: {},
                colaborador:{oficina:{}},
                rol:{},
                modalChange:false,
            }
        }
    }

    fetch = () => {
        this.cambioRef.current.fetch();
      };

    componentWillMount(){
        API.get("/usuarios/yo").then(response => {
            console.log(response.data);
            this.setState({
                info:response.data
            })
        });
    }
    
    showModal = () =>{
        this.setState({
            modalChange:true
        })
    }

    cancelModal = () =>{
        this.setState({
            modalChange:false
        })
    }

    save = (cambioRef) => {
        this.cambioRef = cambioRef;
    }


    guardarContraseña = () =>{
        const form = this.cambioRef.props.form;
        form.validateFields((err, values) => {
            console.log(values);
            if(err){
                return;
            }
            if(values.nuevaContraseña !== values.copiaContraseña){
                Notify.error({
                    message: 'Las contraseñas no son iguales, porfavor ingreselas nuevamente'
                  });
                return;
            }
            this.setState({
                modalChange:false
            })
            let usuario={id:this.state.info.id,password:values.nuevaContraseña}
            API.post(`/usuarios/actualizarpassword`,usuario).then(response=>{
                Notify.success({
                    message: 'La contraseña se actualizo correctamente'
                });  
            }).catch((error)=>{
                Notify.error({
                    message: 'La contraseña no pudo actualizar'
                });
            })
        })
    }

    render(){
        return(
            <Layout>
                <TheHeader>
                <h1> Perfil de Usuario </h1>
                </TheHeader>
                <TheContent>
                <InputGroup size="large">
                    <Col span={22}></Col>
                    <Col span={2}>
                    <FormItem>
                        <Tooltip placement="top" title={"Cambiar contraseña"}>
                            <Button
                            type="primary"
                            shape="circle"
                            icon="setting"
                            onClick={this.showModal}
                            />
                        </Tooltip>
                    </FormItem>
                    </Col>
                </InputGroup>
                <InputGroup size="large">
                    <Col span={4}> 
                    <FormItem label="Nombre">
                    </FormItem></Col>
                    <Col span={18}>
                    <h3>{this.state.info.persona.nombreCorto}</h3>
                    </Col>
                </InputGroup>
                <InputGroup size="large">
                    <Col span={4}> 
                    <FormItem label="Usuario">
                    </FormItem></Col>
                    <Col span={18}>
                    <h3>{this.state.info.username}</h3>
                    </Col>
                </InputGroup>
                <InputGroup size="large">
                    <Col span={4}> 
                    <FormItem label="Rol">
                    </FormItem></Col>
                    <Col span={18}>
                        <h3>{this.state.info.rol.nombre}</h3>
                    </Col>
                </InputGroup>
                <InputGroup size="large">
                    <Col span={4}> 
                    <FormItem label="Oficina">
                    </FormItem></Col>
                    <Col span={18}>
                        <h3>{this.state.info.colaborador.oficina.codigo}</h3>
                    </Col>
                </InputGroup>
                <WrappedForm wrappedComponentRef={this.save} onCancel={this.cancelModal} onOk={this.guardarContraseña} visible={this.state.modalChange}/>
                </TheContent>
            </Layout>
        )
    }
}

export default Perfil;