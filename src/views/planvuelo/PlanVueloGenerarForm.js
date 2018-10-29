import React from "react";
import API from "../../Services/Api";
import { DatePicker, Modal } from "antd";
import moment from "moment";

const RangePicker = DatePicker.RangePicker;

function disabledDate(current) {
    return current && current < moment().endOf('day');
  }

export default class GenerarForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };
  }

  open = () => this.setState({...this.state, visible: true});

  close = () => this.setState({...this.state, visible: false});

  generar = () => {

  }
  render() {
    const dateFormat = "DD/MM/YYYY";
    const monthFormat = "DD/MM/YYYY";

    return (
      <Modal
      visible={this.state.visible}
      title="Generar vuelos agendados"
      okText="Generar"
      cancelText="Cancelar"
      onCancel={this.close}
      onCreate={this.generar}
      >
        <RangePicker
            style={{width: '100%'}}
            disabledDate={disabledDate}
            format={dateFormat}
        />
      </Modal>
    );
  }
}
