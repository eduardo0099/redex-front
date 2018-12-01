import React from 'react';
import { Modal, Form, Input , Col,Select} from 'antd';
import API from '../../Services/Api';
import Notify from "../../utils/notify";

const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;

class InnerForm extends React.Component{
  constructor(props){
    super(props);
    this.state={
      tipoDoc:[],
      oficinas:[],
      roles:[]
    }
  }

  componentDidMount(){
    API.get('/tipodocidentidad').then(response=>{
        this.setState({...this.state,
          tipoDoc:response.data
        })
      })
    API.get('/roles/all').then(response=>{
        this.setState({...this.state,
            roles:response.data
        })
    })
  }

  fetchOficinas=q=>{
    API.get("oficinas/search",{params:{q:q}}).then(response=>{
        this.setState({...this.state,oficinas:response.data});
    });
  };

  render() {
    const { visible, onCancel, onCreate, form } = this.props;
    const { getFieldDecorator } = form;
    console.log("Roles",this.state.roles);
    return (
      <Modal
      style={{ top: 20 }} visible={visible}  width = {800} title="Crear nuevo usuario"  okText="Guardar"
      cancelText="Cancelar"
      onCancel={onCancel}
      onOk={onCreate}
      >
        <Form layout="vertical">
          <FormItem label="Nombres">
            {getFieldDecorator("nombres", {
              rules: [{ required: true, message: 'Porfavor ingrese el nombre del usuario' }],
            })(
              <Input />
            )}
          </FormItem>
          <InputGroup size="large">
          <Col span={12}>
            <FormItem label="Apellido Paterno">
              {getFieldDecorator('aPaterno', {
                rules: [{ required: true, message: 'Porfavor ingrese el apellido paterno ' }],
              })(
                <Input />
              )}
            </FormItem></Col>
            <Col span={12}><FormItem label="Apellido Materno">
              {getFieldDecorator('aMaterno', {
                rules: [{ required: true, message: 'Porfavor ingrese el apellido materno' }],
              })(
                <Input />
              )}
            </FormItem></Col>
          </InputGroup>
          <InputGroup size="large">
          <Col span={12}>
          <FormItem label="Tipo de documento">
            {getFieldDecorator('tipDoc', {
              initialValue:'Seleccionar',
              rules: [{ required: true, message: 'Porfavor seleccione el tipo de documento' }],
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
          <Col span = {12}>
          <FormItem label="Documento de Identidad">
            {getFieldDecorator('docId', {
              rules: [{ required: true, message: 'Porfavor ingrese el documento de identidad' }],
            })(
              <Input value ={Number}/>
            )}
          </FormItem>
          </Col>
          <Col span={12}>
          <FormItem label="Email">
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Porfavor ingrese el email' }],
            })(
              <Input />
            )}
          </FormItem>
          </Col>
          <Col span={12}>
          <FormItem label="Telefono">
            {getFieldDecorator('telefono', {
              rules: [{ required: true, message: 'Porfavor ingrese el telefono' }],
            })(
              <Input value={Number}/>
            )}
          </FormItem>
          </Col>
          <Col span={12}>
          <FormItem label="Rol">
          {getFieldDecorator('rol', {
              rules: [{ required: true, message: 'Porfavor ingrese el oficina' }],
            })(
              <Select 
                style={{width:"100%"}}
                notFoundContent = {null}
                labelInValue={true}
                >
                  {this.state.roles.map(i=>(
                    <Option key={i.id} value={i.id}>
                    {i.nombre}
                    </Option>
                ))}
              </Select>)}
          </FormItem>
          </Col>
          <Col span={12}>
          <FormItem label="Oficina">
          {getFieldDecorator('oficina', {
              rules: [{ required: true, message: 'Porfavor ingrese el rol' }],
            })(
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
          </FormItem>
          </Col>
          </InputGroup>
        </Form>
      </Modal>
     )}
}


const WrappedForm = Form.create()(InnerForm);

export default class UsuarioForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      title: '',
      action: '',
    }
  }
  
  nuevo=()=>{
    this.setState({...this.state,visible:true
    })
  }

  close=()=>{
    this.setState({...this.state,visible:false
    })
  }

  save=()=>{
    let form =  this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      
      let usuario = {nombres:values.nombres, aPaterno:values.aPaterno, aMaterno:values.aMaterno,
      tipDoc:{id:values.tipDoc.key},docId:values.docId,email:values.email, telefono:values.telefono,
      rol:{id:values.rol.key}, oficina:{id:values.oficina.key}}

    API.post(`usuarios/save`,usuario).then(response=>{
      this.props.fetch();
      Notify.success({
        message: 'Usuario registrado'
      });
      this.setState({...this.state,visible:false
      })
    })
    })
  }

  saveFormRef= (formRef) =>{
    this.formRef = formRef;
  }

  render(){
    return(
      <WrappedForm
        wrappedComponentRef={this.saveFormRef}
        visible={this.state.visible}
        onCancel={this.close}
        onCreate={this.save}
        title={this.state.title}
        action={this.state.action}
      />
    )
  }
   
}