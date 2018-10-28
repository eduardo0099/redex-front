import React from "react";
import { Modal, Form, Input, AutoComplete, Select } from "antd";
import API from "../../Services/Api";
const FormItem = Form.Item;
const Option = Select.Option;

class OficinasForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      paises: [],
      dataSource: []
    };
  }

  componentDidMount() {
    this.fetchPaises();
  }

  fetchPaises = (query) => {
    API.get("paises/search", { params: { q: query } })
      .then(response => {
        console.log(response.data);
        this.setState({ ...this.state, paises: response.data });
      });
  };

  onSelect = el => {};

  render() {
    const { visible, onCancel, onCreate, form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Modal
        visible={visible}
        title="Nueva oficina"
        okText="Crear"
        cancelText="Cancelar"
        onCancel={onCancel}
        onCreate={onCreate}
      >
        <Form layout="vertical">
          <FormItem label="Pais">
            {getFieldDecorator("pais", {
              rules: [{ required: true, message: "Selecciona el pais" }]
            })(
              <Select
                showSearch
                showArrow={true}
                filterOption={false}
                onSearch={this.fetchPaises}
                notFoundContent={null}
              >
              {this.state.paises.map(pais => {
                return (
                  <Option key={pais.id} value={pais.id} title={pais.codigo} obj={pais}> {pais.nombre} </Option>
                ) 
              })}
              </Select>
            )}
          </FormItem>
          <FormItem label="Capacidad">
            {getFieldDecorator("capacidad")(<Input type="textarea" />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

const WrappedForm = Form.create()(OficinasForm);

export default WrappedForm;
