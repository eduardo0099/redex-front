import React, { Component } from "react";
import { Layout, Row, Col, Divider,Select,DatePicker,Button,Form } from "antd";
import { TheContent, TheHeader } from "../../components/layout";

const FormItem = Form.Item;

class Perfil extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <Layout>
                <TheHeader>
                <h1> Perfil de Usuario </h1>
                </TheHeader>
                <TheContent>
                    <FormItem label="Nombre"></FormItem>
                </TheContent>
            </Layout>
        )
    }
}

export default Perfil;