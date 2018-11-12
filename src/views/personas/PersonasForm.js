import React from 'react';
import { Modal, Form, Input , Col,Select} from 'antd';
import API from '../../Services/Api';

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
            <FormItem label="Nombre">
            {getFieldDecorator("nombrePersona")(<Input type="textarea" disabled={true} />)}
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
            <FormItem label="Estado">
            {getFieldDecorator("estado")(<Input type="textarea" disabled={true} />)}
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
        this.setState({...this.state,visible:true
        })
    }

    detail = id =>{
        this.setState({...this.state,visible:true
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