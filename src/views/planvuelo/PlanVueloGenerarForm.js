import React from "react";
import API from "../../Services/Api";
import { DatePicker, Modal } from "antd";
import moment from "moment";
import Notify from "../../utils/notify";

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
    if(this.state.fechaInicio == '' && this.state.fechaFin==''){
      Notify.warning({
        message:"No se ha seleccionado el rango de fechas."
      })
    }
    else{
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
            Notify.success({
              message:"Los vuelos agendados se generaron correctamente"
            });
          }).catch((error)=>{
            Notify.error({
              message:"No se pudo generar los vuelos agendados"
            })
          })
          this.setState({ ...this.state, visible: false });
        },
        onCancel() {}
      });
    }
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
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
      <h3>Seleccionar el rango de fechas que desea utilizar.</h3>
        <RangePicker
          style={{ width: "100%" }}
            format="DD/MM/YYYY"
          onChange={this.choose}
        />
      </Modal>
    );
  }
}
