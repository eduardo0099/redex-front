import React from "react";
import API from "../../Services/Api";
import { DatePicker, Modal } from "antd";
import moment from "moment";

const confirm = Modal.confirm;
const RangePicker = DatePicker.RangePicker;

function disabledDate(current) {
  return current && current < moment().endOf("day");
}

export default class GenerarForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      fechaInicio: "",
      fechaFin: ""
    };
  }

  open = () => this.setState({ ...this.state, fechaInicio: '', fechaFin: '', visible: true });

  close = () => this.setState({ ...this.state, visible: false });

  choose = values =>
    this.setState({
      ...this.values,
      fechaInicio: values[0],
      fechaFin: values[1]
    });

  generar = () => {
    confirm({
      title: "Generacion de vuelos",
      content: 'Seguro que desea generar los vuelos?',
      cancelText: 'Cancelar',
      okText: 'Sí, generar',
      onOk: () => {
        let envelope = {
          inicio: this.state.fechaInicio.format('YYYY-MM-DD'),
          fin: this.state.fechaFin.format('YYYY-MM-DD')
        };
        console.dir(envelope);
        API.post("/vuelosagendados/generar", envelope).then(response => {
          this.setState({ ...this.state, visible: false });
        });
      },
      onCancel() {}
    });
  };

  render() {
    return (
      <Modal
        visible={this.state.visible}
        title="Generar vuelos agendados"
        okText="Generar"
        cancelText="Cancelar"
        onCancel={this.close}
        onOk={this.generar}
      >
        <RangePicker
          style={{ width: "100%" }}
          disabledDate={disabledDate}
          format="DD/MM/YYYY"
          onChange={this.choose}
        />
      </Modal>
    );
  }
}
