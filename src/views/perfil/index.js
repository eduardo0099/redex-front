import React, { Component } from "react";
import { Layout, Row, Col, Divider,Select,DatePicker,Button,Form,Input,Icon } from "antd";
import { TheContent, TheHeader } from "../../components/layout";
import API from "../../Services/Api";

const FormItem = Form.Item;
const InputGroup = Input.Group;

class Perfil extends Component {
    constructor(props){
        super(props)
        this.state={
            info:{
                persona: {},
                colaborador:{oficina:{}},
                rol:{},
                
            }
        }
    }

    componentWillMount(){
        API.get("/usuarios/yo").then(response => {
            console.log(response.data);
            this.setState({
                info:response.data
            })
        });
    }

    render(){
        return(
            <Layout>
                <TheHeader>
                <h1> Perfil de Usuario </h1>
                </TheHeader>
                <TheContent>
                <InputGroup size="large">
                    <Col span={4}> 
                    <FormItem label="Nombre">
                    </FormItem></Col>
                    <Col span={18}><Input type="textarea" disabled={true} placeholder={this.state.info.persona.nombreCorto}></Input></Col>
                </InputGroup>
                <InputGroup size="large">
                    <Col span={4}> 
                    <FormItem label="Usuario">
                    </FormItem></Col>
                    <Col span={18}><Input type="textarea" disabled={true} placeholder={this.state.info.username}/></Col>
                </InputGroup>
                <InputGroup size="large">
                    <Col span={4}> 
                    <FormItem label="Rol">
                    </FormItem></Col>
                    <Col span={18}><Input type="textarea" disabled={true} placeholder={this.state.info.rol.nombre}/></Col>
                </InputGroup>
                <InputGroup size="large">
                    <Col span={4}> 
                    <FormItem label="Oficina">
                    </FormItem></Col>
                    <Col span={18}><Input type="textarea" disabled={true} placeholder={this.state.info.colaborador.oficina.codigo}/></Col>
                </InputGroup>
                </TheContent>
            </Layout>
        )
    }
}

export default Perfil;