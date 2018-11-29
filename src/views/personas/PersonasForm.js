import React from 'react';
import { Modal, Form, Input , Col,Select} from 'antd';
import API from '../../Services/Api';
import Notify from '../../utils/notify';

const FormItem = Form.Item;

class InnerForm extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const { visible, onCancel, onCreate, form,title } = this.props;
        const  {getFieldDecorator} = form;
        return(
            <Modal style={{ top: 20 }} visible={visible} title={title}  
            onCancel={onCancel}
            onOk={onCreate}>
            <FormItem style={{display: 'none'}}>
            {getFieldDecorator("id")(<div></div>)}
            </FormItem>
            <FormItem label="Nombre">
            {getFieldDecorator("nombre")(<Input type="textarea" disabled={true} />)}
            </FormItem>
            <FormItem label="DNI">
            {getFieldDecorator("dni")(<Input type="textarea" disabled={true} />)}
            </FormItem>
            <FormItem label="Email">
            {getFieldDecorator("email")(<Input type="textarea"  />)}
            </FormItem>
            <FormItem label="Telefono">
            {getFieldDecorator("telefono")(<Input type="textarea"  />)}
            </FormItem>
            </Modal>
        )
    }
}

const WrappedForm = Form.create()(InnerForm);

export default class PersonasForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          visible: false,
          title:""
        }
    }

    fetch=()=>{
        this.setState({...this.state,visible:true
        })
      }
    
    close=()=>{
        this.setState({...this.state,visible:false
        })
    }

    save = () =>{
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
              return;
            }
            console.log("Valores form:", values);
            API.post(`personas/editar`,values).then(response=>{
                Notify.success({
                    message: 'Persona actualizada'
                });
                form.resetFields();
                this.props.fetch();
                this.setState({...this.state,visible:false
                });
            }).catch((error)=>{
                Notify.error({
                    message:"No se pudo actualizar los campos de la persona seleccionada."
                })
            })
        });
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
      }

    detail = id =>{
        console.log(id);
        //Api para devolver info de la persona
        API.get(`personas/${id}`).then(response=>{
            let data = response.data;
            console.log("Data:",data);
            this.setState({...this.state,visible:true},()=>{
                this.formRef.props.form.setFields({
                    id:{value:data.id},
                    nombre:{value:data.nombres + data.paterno + data.materno},
                    dni:{value:data.numeroDocumentoIdentidad},
                    email:{value:data.email},
                    telefono:{value:data.telefono}
                })
            }
            )
        })
    }

    render(){
        return(
            <WrappedForm
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.visible}
            onCancel={this.close}
            onCreate={this.save}
            title={this.state.title}
            />
        )
    }
}